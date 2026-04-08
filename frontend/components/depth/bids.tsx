function Bids({ bids }: { bids: [string, string][] }) {
  let currentTotal = 0;
  const releventBids = bids.slice(0, 15);
  console.log("relevent bids: ", releventBids);
  const bidsWithTotal: [string, string, number][] = [];
  for (let i = releventBids.length - 1; i >= 0; i--) {
    currentTotal = Number(
      (currentTotal + Number(releventBids[i][1])).toFixed(4),
    );
    bidsWithTotal.push([releventBids[i][0], releventBids[i][1], currentTotal]);
  }
  // bidsWithTotal
  //   1000   1     1
  //   900    0.5    1.5
  //   800    1      2.5
  const maxSum = currentTotal;
  console.log("bids with total: ", bidsWithTotal);
  return (
    <div className="max-h-64 overflow-auto ">
      {bidsWithTotal.map((bid) => (
        <div className="relative w-full text-xs">
          {/* bg-[#43ff64d9]  darker shade of green */}
          <div
            className="absolute top-0 right-0 h-full  bg-[#00c27829] "
            style={{ width: `${(bid[2] / maxSum) * 100}%` }}
          />

          <div className="z-10 relative flex justify-between ">
            <div className="text-[#00c278]/90">{bid[0]}</div>
            <div className="text-white">{bid[1]}</div>
            <div className="text-white">{bid[2]}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Bids;
