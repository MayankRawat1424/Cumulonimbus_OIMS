import React from "react";
import Kanban from "./Kanban";

const Home = () => {
  return (
    <>
      <div className="grid grid-cols-5 h-screen px-8 bg-neutral-100">
        <div className="col-span-5">
          <Kanban />
        </div>
      </div>
    </>
  );
};

export default Home;
