import { ABOUT } from "@/src/consts/strings";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="mx-3 md:mx-auto md:max-w-6xl pb-4">
      <h1 className="text-3xl font-bold text-center pt-8 pb-4">About</h1>
      <div className="bg-white rounded-lg pb-4 mb-4 px-4">
        <div className="py-4 flex justify-center">
          <Image src="/textLogoB.png" alt="textLogo" width={121} height={40} />
        </div>
        {Object.entries(ABOUT.CONTENT1.CONTENT).map(
          ([messageKey, messageValue]) => (
            <p key={messageKey} className="ml-4 py-1 text-lg">
              {messageValue}
            </p>
          )
        )}
      </div>

      <div className="bg-white rounded-lg pb-4 my-12 px-4">
        <h1 className="text-4xl font-bold py-4 text-center">
          {ABOUT.CONTENT2.TITLE}
        </h1>
        {Object.entries(ABOUT.CONTENT2.CONTENT).map(
          ([messageKey, messageValue]) => (
            <p key={messageKey} className="ml-4 py-1 text-lg">
              {messageValue}
            </p>
          )
        )}
      </div>

      <div className="bg-white rounded-lg pb-4 my-12 px-4">
        <div className="py-4 flex justify-center">
          <Image
            src="/separateLogo_>.png"
            alt="Logo icon"
            width={30}
            height={45}
          />
        </div>
        {Object.entries(ABOUT.CONTENT3.CONTENT).map(
          ([messageKey, messageValue]) => (
            <p key={messageKey} className="ml-4 py-1 text-lg">
              {messageValue}
            </p>
          )
        )}
      </div>

      <div className="bg-white rounded-lg pb-4 my-8 px-4">
        <h1 className="text-4xl font-bold py-4 text-center">
          {ABOUT.CONTENT4.TITLE}
        </h1>
        {Object.entries(ABOUT.CONTENT4.CONTENT).map(
          ([messageKey, messageValue]) => (
            <p key={messageKey} className="ml-4 py-1 text-lg">
              {messageValue}
            </p>
          )
        )}
      </div>
    </div>
  );
}
