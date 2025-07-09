import LoginForm from "@/components/shared/form/loginForm";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="bg-[#f2f4f7]">
      <div className="sticky top-0 w-full bg-primary p-3 flex items-center justify-between">
        <div className="flex items-center text-white font-bold text-lg space-x-2">
          <Link href="/">
            <Image
              src="/images/mpesa-logo.png"
              alt="icons"
              width={90}
              height={40}
              priority={false}
              className=""
            />
          </Link>
          <div className="h-5 w-px grow bg-white" />
          <Link href="/">
            <Image
              src="/images/safaricom-logo.png"
              alt="icons"
              width={90}
              height={40}
              priority={false}
              className=""
            />
          </Link>
        </div>
        <div className="flex items-center gap-2 font-bold text-white">
          <button type="button" className="max-sm:hidden uppercase mr-2">
            Apply
          </button>
          <button type="button" className="max-sm:hidden uppercase">
            Recommend
          </button>
          <button
            type="button"
            className="uppercase bg-white rounded-md px-4 py-2 text-primary"
          >
            Login
          </button>
        </div>
      </div>
      <div className="min-h-screen flex 2xl:items-center justify-center py-10 md:pt-[25vh] 2xl:pt-6 md:pb-6 px-4 md:px-8 xl:px-4">
        <div className="w-full max-w-6xl 2xl:max-w-screen-xl flex flex-col max-lg:items-center lg:flex-row h-fit justify-between gap-10">
          <div className="max-w-lg">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
              M-PESA Acquisition Portal
            </h1>
            <p className="text-sm md:text-base">
              Welcome to M-PESA world of convenience! This Portal provides an
              efficient way to access and manage your sales.
            </p>
            <LoginForm />
          </div>
          <div className="max-md:hidden">
            <Image
              src="/images/icons.png"
              alt="icons"
              width={250}
              height={240}
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
