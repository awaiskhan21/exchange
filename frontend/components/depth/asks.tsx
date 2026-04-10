function Asks({ asks }: { asks: [string, string][] }) {
  let currentTotal = 0;
  const releventAsks = asks.slice(0, 15).reverse();
  const asksWithTotal: [string, string, number][] = [];
  for (let i = releventAsks.length - 1; i >= 0; i--) {
    currentTotal = Number(
      (currentTotal + Number(releventAsks[i][1])).toFixed(4),
    );
    // currentTotal = Number(
    //   (currentTotal + Number(releventAsks[i][1])).toFixed(4),
    // );
    asksWithTotal.push([releventAsks[i][0], releventAsks[i][1], currentTotal]);
  }
  const maxSum = currentTotal;
  asksWithTotal.reverse();
  return (
    <div className="max-h-64 overflow-auto">
      {asksWithTotal.map((ask) => (
        <div className="relative w-full text-xs" key={ask[0]}>
          <div
            className="absolute right-0 top-0 h-full bg-red-500/16"
            style={{ width: `${(ask[2] / maxSum) * 100}%` }}
          />
          <div className="flex justify-between z-10 ">
            <div className="text-red-500">{ask[0]}</div>
            <div className="text-white">{ask[1]}</div>
            <div className="text-white">{ask[2]}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Asks;
