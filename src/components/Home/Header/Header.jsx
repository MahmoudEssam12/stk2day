import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import style from "./Header.module.scss";
import { TextPlugin } from "gsap/dist/TextPlugin";
// import dynamic from "next/dynamic";
// const TextPlugin = dynamic(() => import("gsap/TextPlugin"), { ssr: false });
// import { NextPage } from "next";

gsap.registerPlugin(TextPlugin);
function Header() {
  let tl = gsap.timeline({ ease: "power3.inOut" });
  const [active, setActive] = useState(1);
  const first = useRef();
  const second = useRef();
  const third = useRef();
  const fourth = useRef();

  useEffect(() => {
    gsap.to(".test", {
      duration: 6,
      text: "hello world!",
      ease: "power3.inOut",
    });
    // make the duration 1.5 for the from and to
    // tl.from(first.current, { y: 0, duration: 3 });
    // tl.to(first.current, {
    //   duration: 3,
    //   y: -120,
    // });
    // tl.to(second.current, { y: -120, duration: 3 });
    // tl.to(second.current, {
    //   duration: 3,
    //   y: -240,
    // });
    // tl.to(third.current, { y: -240, duration: 3 });
    // tl.to(third.current, {
    //   duration: 3,
    //   y: -360,
    // });
    // tl.to(fourth.current, { y: -360, duration: 3 });
    // tl.to(fourth.current, {
    //   duration: 3,
    //   y: -480,
    // });
  }, []);

  useEffect(() => {
    // tl.set([second.current, third.current, fourth.current], {
    //   position: "absolute",
    //   bottom: 0,
    //   left: "0",
    //   y: 120,
    // });
    tl.set(first.current, {
      y: 0,
    });
    gsap.utils.toArray(".headerText").forEach((text, i) => {
      if (i === 3) {
        tl.to(text, { y: 0, duration: 2, stagger: 1 }, ">-1.3");
        tl.to(text, { duration: 2, text: text.textContent });
      }
      // else if(i === 0){
      //   tl.from(text, {y:0, duration:2})

      // }
      else {
        tl.to(text, { y: 0, duration: 2, stagger: 1 }, ">-1.3");
        tl.to(text, { duration: 2, text: text.textContent });
        tl.to(text, { y: -120, duration: 2, stagger: 1 }, ">-1.3");
      }
    });
    const interval = setInterval(() => {
      tl.reversed(!tl.reversed());
      console.log(tl.totalDuration());
    }, 14200);

    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   let counter = 1;
  //   let plus = true;
  //   let reverse = false;
  //   const interval = setInterval(() => {
  //     if (counter === 4) {
  //       plus = false;
  //       reverse = true;
  //     }
  //     if (counter < 4 && plus) {
  //       setActive((prev) => {
  //         return prev + 1;
  //       });
  //       counter++;
  //     }
  //     if (reverse) {
  //       if (counter === 1) {
  //         plus = true;
  //         reverse = false;
  //       } else {
  //         setActive((prev) => prev - 1);
  //         counter--;
  //       }
  //     }
  //   }, 2600);
  //   // clearInterval(interval);
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(()=>{
  //   if(active)
  // },[active])

  return (
    <>
      <header className={style.header_wrapper}>
        <div className={style.col}>
          <h2 ref={first} className="headerText">
            Ame
          </h2>
          <h2 ref={second} className="headerText">
            Baltic
          </h2>
          <h2 ref={third} className="headerText">
            Snorri
          </h2>
          <h2 ref={fourth} className="headerText">
            Orvar
          </h2>
        </div>
        <div className={style.col}>
          <picture className={`${active === 1 && style.active}`}>
            <img src="/images/header_image.png" alt="stk2day shopping image" />
          </picture>
          <picture className={`${active === 2 && style.active}`}>
            <img src="/images/header_image.png" alt="stk2day shopping image" />
          </picture>
          <picture className={`${active === 3 && style.active}`}>
            <img src="/images/header_image.png" alt="stk2day shopping image" />
          </picture>
          <picture className={`${active === 4 && style.active}`}>
            <img src="/images/header_image.png" alt="stk2day shopping image" />
          </picture>
        </div>
      </header>
    </>
  );
}

export default Header;
