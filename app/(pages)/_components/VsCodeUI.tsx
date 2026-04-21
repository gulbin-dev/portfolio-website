import UI_Task from "@components/UI_Task";
import { gsap, mediaQueries, ScrollTrigger, useGSAP } from "@utils/gsap";
import { useLoading } from "@utils/LoadingContext";

export default function VsCodeUI() {
  const { isRevealed } = useLoading();

  // handle VSCode section header animation
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        mediaQueries,
        () => {
          const skewVSCodeHeader = gsap.quickTo(".vs-code-header", "skewY");
          const yVSCodeHeader = gsap.quickTo(".vs-code-header", "y");
          const clampSkew = gsap.utils.clamp(-4, 4);
          const clampYVSCode = gsap.utils.clamp(-20, 20);

          gsap.to(".vs-code-header", {
            scrollTrigger: {
              trigger: ".vs-code-header",
              start: "top 100%",
              onUpdate: (self) => {
                skewVSCodeHeader(clampSkew(self.getVelocity() / 2));
                yVSCodeHeader(clampYVSCode(self.getVelocity() / 50));
              },
            },
          });
        },
      );
    },
    { dependencies: [isRevealed], revertOnUpdate: true },
  );

  // handle fade animation on scroll
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        // media queries conditions giving a responsive animation
        // based on screen size and reduce motion
        mediaQueries,
        (context) => {
          const { isReduceMotion } = context.conditions ?? {};
          gsap.set(".code-snippet p, .ui-circle, .task", {
            autoAlpha: 0,
            y: isReduceMotion ? 10 : 100,
          });
          ScrollTrigger.batch(".code-snippet p, .ui-circle, .task", {
            onEnter: (elements) => {
              gsap.to(elements, {
                y: 0,
                autoAlpha: 1,
                stagger: 0.15,
                overwrite: true,
              });
            },
            onLeaveBack: (elements) =>
              gsap.set(elements, { opacity: 0, y: 100, overwrite: true }),
            start: "top 98%",
          });
        },
      );
    },
    { dependencies: [isRevealed], revertOnUpdate: true },
  );

  return (
    <section
      aria-hidden="true"
      className="section snap w-full h-full  section3-bg"
    >
      <h2
        id="vs-code-header"
        className="vs-code-header pt-8 pb-3 text-heading-xl text-center"
      >
        Solving Problem Into Smaller Tasks
      </h2>

      {/* dark background <div> simialr to vs code */}
      <div className=" bg-[#0F111A] w-full">
        <div className="max-w-96 place-self-center px-3 flex flex-col py-4 text-heading-md tablet:text-2xl w-full ">
          <p id="issue" className="text-[#FC4646]">
            <span id="issue-span" className="text-[#65E913] font-bold">
              Issue:{" "}
            </span>{" "}
            Bad name casing, extra white spaces, and has number characters on
            user&apos;s profile name
          </p>

          {/* first code snippet.. */}
          <div className="flex pt-4">
            <div className="code-snippet flex flex-col pr-1">
              <p className="code-darkgray">{"//sample user data"}</p>
              <p>
                <span className="code-reserved-name">const </span>
                <span className="code-userdefined">user </span>
                <span className="code-reserved-syntax">= </span>
                <span className="code-casing">{"{"}</span>
              </p>
              <p>
                <span className="code-userdefined">id</span>
                <span className="code-reserved-syntax">: </span>
                <span className="code-number">101</span>
                <span className="code-reserved-syntax">,</span>
              </p>
              <p>
                <span className="code-userdefined">name</span>
                <span className="code-reserved-syntax">: &quot;</span>
                <span className="code-string">
                  {"  "}
                  JoShuA GLENN 23 R. GulBiN 2313{"  "}
                </span>
                <span className="code-reserved-syntax">&quot;,</span>
              </p>
              <p>
                <span className="code-casing">{"}"}</span>
                <span className="code-reserved-syntax">;</span>
              </p>
              <br />
              <br />
              <p>
                <span className="code-reserved-name">function </span>
                <span className="code-func-prop">handleFix</span>
                <span className="code-casing">{"("}</span>
                <span className="code-userdefined italic">name</span>
                <span className="code-casing">{")"}</span>
                <span className="code-casing">{"{"}</span>
              </p>
              <p className="code-darkgray">{"//some code..."}</p>
            </div>
          </div>
          <UI_Task task="Task 1: remove numbers" />
          {/* second code snippet.. */}
          <div className="flex pt-4">
            <div className="code-snippet flex flex-col pr-1">
              <p>
                <span className="code-reserved-name">let </span>
                <span className="code-userdefined">cleaned </span>
                <span className="code-reserved-syntax">= </span>
                <span className="code-userdefined">name</span>
                <span className="code-reserved-syntax">.replace</span>
                <span className="code-casing">{"("}</span>
                <span className="code-reserved-syntax">/</span>
                <span className="code-string">\d</span>
                <span className="code-reserved-syntax">+/</span>
                <span className="code-number">g</span>
                <span className="code-reserved-syntax">{', ""'}</span>
                <span className="code-casing">{")"}</span>
                <span className="code-reserved-syntax">;</span>
              </p>
            </div>
          </div>
          <UI_Task task="Task 2: trim and fix spaces" />
          {/* third code snippet */}
          <div className="flex flex-col pt-4">
            <div className="code-snippet flex flex-col pr-1">
              <p>
                <span className="code-userdefined">cleaned = cleaned</span>
                <span className="code-reserved-syntax">.</span>
                <span className="code-reserved-name">toLowerCase</span>
                <span className="code-casing">{"()"}</span>
                <span className="code-reserved-syntax">.</span>
                <span className="code-reserved-name">replace</span>
                <span className="code-casing">{"("}</span>
                <span className="code-reserved-syntax">/\b</span>
                <span className="code-string">\w</span>
                <span className="code-reserved-syntax">/</span>
                <span className="code-number">g</span>
                <span className="code-reserved-syntax">, </span>
              </p>
              <p>
                <span className="code-inner-casing"> {"("}</span>
                <span className="code-userdefined italic">char</span>
                <span className="code-inner-casing"> {") "}</span>
                <span className="code-reserved-name">{"=> "}</span>
                <span className="code-userdefined">char</span>
                <span className="code-reserved-syntax">.</span>
                <span className="code-func-prop">toUpperCase</span>
                <span className="code-inner-casing">{"()"}</span>
                <span className="code-casing">{")"}</span>
                <span className="code-reserved-syntax">;</span>
              </p>
              <br />
              <p>
                <span className="code-reserved-name italic">return </span>
                <span className="code-userdefined">cleaned</span>
                <span className="code-reserved-syntax">;</span>
              </p>
              <p className="code-casing">{"}"}</p>
              <br />
              <p className="code-darkgray">{"// some code later..."}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
