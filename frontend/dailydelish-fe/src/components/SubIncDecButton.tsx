import { useSubscriptionStore } from "@/store/useSubscriptionStore";
import { ArrowLeft, ArrowRight } from "lucide-react";

type SubIncDecButtonProps = {
    schedule: string,
    productId: number
}




export default function SubIncDecButton({ productId, schedule }: SubIncDecButtonProps) {
    const schedules = ["weekly", "biweekly", "monthly"];

    const { setSchedule } = useSubscriptionStore();

    const handleIncrement = () => {
      const currentIndex = schedules.indexOf(schedule);
      const nextIndex =
        (currentIndex + 1 + schedules.length) % schedules.length;
      const nextSchedule = schedules[nextIndex];
      setSchedule(productId, nextSchedule);
    };

    const handleDecrement = () => {
        const currentIndex = schedules.indexOf(schedule);
        const nextIndex = (currentIndex - 1 + schedules.length) % schedules.length;
        const nextSchedule = schedules[nextIndex];
        setSchedule(productId, nextSchedule);
    }

    return (
        <div className="flex flex-row">
            <ArrowLeft onClick={handleDecrement}></ArrowLeft>
            <p className="mx-0.5">{ schedule }</p>
            <ArrowRight onClick={handleIncrement}></ArrowRight>
        </div> 
    )
}