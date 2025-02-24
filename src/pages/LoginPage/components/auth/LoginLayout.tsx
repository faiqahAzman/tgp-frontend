import React from "react";
import { LoginHeader } from "./LoginHeader";
import { LoginForm } from "./LoginForm";

export const LoginLayout: React.FC = () => {
  return (
    <div className="flex flex-col shadow-[0px_38px_200px_rgba(0,0,0,0.1)] relative min-h-[868px] overflow-hidden items-stretch p-[60px] rounded-3xl max-md:px-5">
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/8630395440219fc371f8275fb74178c99ec88e0f0d5c8dbe7133c50ae25b09a9?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/8630395440219fc371f8275fb74178c99ec88e0f0d5c8dbe7133c50ae25b09a9?placeholderIfAbsent=true&width=200 200w, https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/8630395440219fc371f8275fb74178c99ec88e0f0d5c8dbe7133c50ae25b09a9?placeholderIfAbsent=true&width=400 400w, https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/8630395440219fc371f8275fb74178c99ec88e0f0d5c8dbe7133c50ae25b09a9?placeholderIfAbsent=true&width=800 800w, https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/8630395440219fc371f8275fb74178c99ec88e0f0d5c8dbe7133c50ae25b09a9?placeholderIfAbsent=true&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/8630395440219fc371f8275fb74178c99ec88e0f0d5c8dbe7133c50ae25b09a9?placeholderIfAbsent=true&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/8630395440219fc371f8275fb74178c99ec88e0f0d5c8dbe7133c50ae25b09a9?placeholderIfAbsent=true&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/8630395440219fc371f8275fb74178c99ec88e0f0d5c8dbe7133c50ae25b09a9?placeholderIfAbsent=true"
        className="absolute h-full w-full object-cover inset-0"
        alt="Background"
      />
      <main className="relative bg-[rgba(252,251,252,0)] w-full max-w-[1160px] overflow-hidden pb-[72px] max-md:max-w-full">
        <LoginHeader />
        <div className="flex w-full justify-center flex-wrap mt-[30px] max-md:max-w-full">
          <div className="flex min-w-60 flex-col items-center text-white w-[463px] pl-[15px] max-md:max-w-full">
            <div className="max-w-full w-[448px]">
              <h2 className="text-[55px] font-black tracking-[1.65px] max-md:max-w-full max-md:text-[40px]">
                Login into your account
              </h2>
              <p className="text-xl font-normal mt-6 max-md:max-w-full">
                Make data-driven decisions—all in one place!
              </p>
            </div>
          </div>
          <LoginForm />
        </div>
      </main>
      <footer className="relative text-[rgba(184,185,189,1)] text-xl font-normal text-center max-md:max-w-full">
        Copyright © 2025 Maynet TGP Ace
      </footer>
    </div>
  );
};
