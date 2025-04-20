import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="relative aspect-[16/9]">
        <Image
          src={"/top.png"}
          alt={"top image"}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div>
        <span>top page message.</span>
      </div>
    </>
  );
}
