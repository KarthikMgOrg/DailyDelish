from gi.repository import Gst
import numpy as np

def producer(pipeline):
    appsink = pipeline.get_by_name('sink')
    appsink.set_property('caps', Gst.Caps.from_string('video/x-raw, format=BGR'))
    while True:
        sample = appsink.emit('pull-sample')
        print('Pulled sample:', sample)
        if not sample:
            break
        buffer = sample.get_buffer()

        success, map_info = buffer.map(Gst.MapFlags.READ)
        if success:
            frame = np.frombuffer(map_info.data, np.uint8)
            caps = sample.get_caps()
            width = caps.get_structure(0).get_value('width')
            height = caps.get_structure(0).get_value('height')
            expected_size = height * width * 3

            if frame.size == expected_size:
                frame = frame.reshape((height, width, 3))
                yield frame
            else:
                print(f"Warning: Frame size mismatch. Expected {expected_size} elements, got {frame.size}")
            buffer.unmap(map_info)
        else:
            break
