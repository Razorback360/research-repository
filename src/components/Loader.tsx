const Loader = ({pageLoader=true}) => {
  const circleCommonClasses = "h-2.5 w-2.5 bg-primary rounded-full";

  return (
    <div className={`flex flex-col items-center justify-center ${pageLoader ? "h-full" : "h-auto mt-4"}`}>
      <div className="flex">
        <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
        <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
        <div className={`${circleCommonClasses} animate-bounce400`}></div>
      </div>
    </div>
  );
};

export default Loader;
