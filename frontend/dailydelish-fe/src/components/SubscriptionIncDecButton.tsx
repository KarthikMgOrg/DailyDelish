type SubscriptionIncDecButton = {};

export default function SubscriptionIncDecButton() {
  return (
    <div className="flex flex-row">
      <label htmlFor="cars"></label>
      <select name="cars" id="frequency" style={{ borderRadius: "20px" }}>
        <option value="weekly">weekly</option>
        <option value="biweekly">biweekly</option>
        <option value="monthly">monthly</option>
      </select>
    </div>
  );
}
