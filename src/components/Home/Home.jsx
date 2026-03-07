import React from "react";
import Kanban from "./Kanban";

const Home = () => {
  return (
    <>
      <div className="grid grid-cols-5 h-screen ml-8 pr-8 bg-neutral-50">
        <div className="col-span-1"></div>

        <div className="col-span-4">
          <Kanban />
        </div>
      </div>
    </>
  );
};

export default Home;
