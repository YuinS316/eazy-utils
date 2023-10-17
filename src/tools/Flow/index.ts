// const stop = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// const subFlow = flow([
//   () => stop(1000).then(() => console.log('3')),
// ]);

type Entry = Function | Array<Entry> | Output;
interface Output { run: (done?: Function) => Promise<void> };

const isReturnFlow = (target: Entry): target is Output => Object.hasOwn(target, 'run');

export function flow(list: Entry[]): Output {
  const wrapper = async (arr: Entry[]) => {
    for (const item of arr) {
      if (Array.isArray(item))
        await flow(item).run();

      else if (isReturnFlow(item))
        await item.run();

      else
        await item();
    }
  };

  return {
    async run(done?: Function) {
      await wrapper(list);
      done?.();
    },
  };
}

// flow([
//   () => console.log('1'),
//   () => console.log('2'),
//   subFlow,
//   [() => stop(1000).then(() => console.log('4')), () => console.log('5')],
//   () => console.log('6'),
// ]).run(() => {
//   console.log('done');
// });
