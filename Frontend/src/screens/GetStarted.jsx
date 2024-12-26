import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../components/index";
import logo from "/uber_logo.png";
import background from "/get_started_illustration.jpg";
function GetStarted() {
  return (
    <div
      className="flex flex-col justify-between w-full h-full bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <img
        className="h-6 object-contain m-6 self-start"
        src={logo}
        alt="Logo"
      />
      <div
        className="flex flex-col bg-white p-4 pb-8 gap-8 rounded-t-lg
      "
      >
        <h1 className="text-2xl font-semibold">Get started with uber</h1>
        <Button title={"Continue"} path={"/login"} type={"link"} icon={<ArrowRight />} />
      </div>
    </div>
  );
}

export default GetStarted;
