/** UI component used for VsCodeUI task items */
export default function UI_Task({ task }: { task: string }) {
  return (
    <div className="flex flex-col gap-1 tablet:gap-1.5 desktop:gap-2  items-center tablet:items-start">
      <ul className="flex flex-col gap-1 tablet:gap-1.5 desktop:gap-2 items-center tablet:min-w-45">
        <li>
          <span className="ui-circle"></span>
        </li>
        <li>
          <span className="ui-circle"></span>
        </li>
        <li>
          <span className="ui-circle"></span>
        </li>
      </ul>
      <p className="mt-1! task">
        <span className="bg-secondary-color py-1 px-2 ml-5! rounded-full">
          {task}
        </span>
      </p>
    </div>
  );
}
