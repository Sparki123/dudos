function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

function batchAndFetchWithDelay(fn, args, batchSize = 5, delay = 100) {
  console.log("⏱ осталось", args.length);
  if (args.length === 0) {
    return Promise.resolve([]);
  }
  const batch = args.slice(0, batchSize);
  const current = Promise.allSettled(batch.map(fn)).then((data) => {
    return data.map((item, index) => {
      return {
        arg: batch[index],
        response:
          item.status === "rejected"
            ? console.log(item.reason) || null
            : item.value,
      };
    });
  });

  const next = sleep(delay).then(() =>
    batchAndFetchWithDelay(fn, args.slice(batchSize), batchSize, delay)
  );

  return Promise.all([current, next]).then(([a, b]) => [...a, ...b]);
}

module.exports = {
  batchAndFetchWithDelay,
};
