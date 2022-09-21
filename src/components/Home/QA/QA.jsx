import React, { useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import styles from "./QA.module.scss";
function QA() {
  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <>
      <Accordion activeIndex={0}>
        <AccordionTab
          header={
            <React.Fragment>
              <i></i>
              <picture>
                <img
                  src="/images/qa1.png"
                  alt="stk2day questions and answers"
                  className={styles.accordion_icon}
                />
              </picture>
              <span className={styles.header_text}>
                هل يتوفر الشحن الى مصر ؟
              </span>
            </React.Fragment>
          }
          contentClassName={styles.accordion}
          //   contentStyle={{ backgroundColor: "#fff " }}
        >
          <p>
            الان يتوفر لدينا خدمة الشحن داخل مصر فقط, ونسعى جاهدين لتوصيل
            منتجاتنا لجميع أنحاء العالم .
          </p>
        </AccordionTab>
        <AccordionTab
          header={
            <React.Fragment>
              <i></i>
              <picture>
                <img
                  src="/images/qa1.png"
                  alt="stk2day questions and answers"
                  className={styles.accordion_icon}
                />
              </picture>
              <span className={styles.header_text}>ما هى تكلفة الشحن ؟</span>
            </React.Fragment>
          }
        >
          <p>
            لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
            أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت
            انيم أد مينيم فينايم,كيواس نوستريد
          </p>
        </AccordionTab>
        <AccordionTab
          header={
            <React.Fragment>
              <i></i>
              <picture>
                <img
                  src="/images/qa1.png"
                  alt="stk2day questions and answers"
                  className={styles.accordion_icon}
                />
              </picture>
              <span className={styles.header_text}>ما مدة التوصيل ؟</span>
            </React.Fragment>
          }
        >
          <p>
            لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
            أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت
            انيم أد مينيم فينايم,كيواس نوستريد
          </p>
        </AccordionTab>
        <AccordionTab
          header={
            <React.Fragment>
              <i></i>
              <picture>
                <img
                  src="/images/qa1.png"
                  alt="stk2day questions and answers"
                  className={styles.accordion_icon}
                />
              </picture>
              <span className={styles.header_text}>كيف يمكن تتبع طلبى ؟</span>
            </React.Fragment>
          }
        >
          <p>
            لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
            أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت
            انيم أد مينيم فينايم,كيواس نوستريد
          </p>
        </AccordionTab>
        <AccordionTab
          header={
            <React.Fragment>
              <i></i>
              <picture>
                <img
                  src="/images/qa1.png"
                  alt="stk2day questions and answers"
                  className={styles.accordion_icon}
                />
              </picture>
              <span className={styles.header_text}>
                الطلبيه لم تصلنى بعد ما العمل ؟
              </span>
            </React.Fragment>
          }
        >
          <p>
            لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
            أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت
            انيم أد مينيم فينايم,كيواس نوستريد
          </p>
        </AccordionTab>
        <AccordionTab
          header={
            <React.Fragment>
              <i></i>
              <picture>
                <img
                  src="/images/qa1.png"
                  alt="stk2day questions and answers"
                  className={styles.accordion_icon}
                />
              </picture>
              <span className={styles.header_text}>
                ماذا افعل اذا المنتج وصلنى تالف او به عيوب ؟
              </span>
            </React.Fragment>
          }
        >
          <p>
            لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
            أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت
            انيم أد مينيم فينايم,كيواس نوستريد
          </p>
        </AccordionTab>
      </Accordion>
    </>
  );
}

export default QA;
