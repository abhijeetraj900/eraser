import React from "react";

function Hero() {
  return (
    <section className="bg-black">
      <div className="flex items-baseline justify-center pt-20">
        <h2 className="text-white border text-center px-3 p-2 rounded-full  border-white ">
          {" "}
          See Whats's New | <span className="text-sky-500">AI Diagram</span>
        </h2>
      </div>
      <div className="mx-auto h-screen max-w-screen-xl px-4 py-8 lg:flex ">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl text-sky-300 font-extrabold sm:text-5xl">
            Document & diagrams
            <strong className="font-extrabold text-white sm:block">
              {" "}
              for engineering teams{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-slate-200">
            All-in-one markdown editor, collabrative canvas, and diagram-as-code
            builder
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-white px-12 text-black py-3 text-sm font-medium  shadow hover:bg-slate-300 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
