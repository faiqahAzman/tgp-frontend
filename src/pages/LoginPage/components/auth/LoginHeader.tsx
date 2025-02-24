import React from "react";

export const LoginHeader: React.FC = () => {
  return (
    <div className="bg-[rgba(255,255,255,0)] shadow-[0px_4px_148px_rgba(0,0,0,0.02)] flex min-h-56 w-full flex-col items-stretch justify-center px-5 py-12 max-md:max-w-full">
      <div className="flex w-full items-center gap-5 justify-center flex-wrap max-md:max-w-full">
        <div className="self-stretch w-32 my-auto">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/6aba18c1a7999075b45fe236acc082a1c3dfb6deda8770cfb0d1b0782dcf3bdf?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/6aba18c1a7999075b45fe236acc082a1c3dfb6deda8770cfb0d1b0782dcf3bdf?placeholderIfAbsent=true&width=200 200w, https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/6aba18c1a7999075b45fe236acc082a1c3dfb6deda8770cfb0d1b0782dcf3bdf?placeholderIfAbsent=true&width=400 400w, https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/6aba18c1a7999075b45fe236acc082a1c3dfb6deda8770cfb0d1b0782dcf3bdf?placeholderIfAbsent=true&width=800 800w, https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/6aba18c1a7999075b45fe236acc082a1c3dfb6deda8770cfb0d1b0782dcf3bdf?placeholderIfAbsent=true&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/6aba18c1a7999075b45fe236acc082a1c3dfb6deda8770cfb0d1b0782dcf3bdf?placeholderIfAbsent=true&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/6aba18c1a7999075b45fe236acc082a1c3dfb6deda8770cfb0d1b0782dcf3bdf?placeholderIfAbsent=true&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/6aba18c1a7999075b45fe236acc082a1c3dfb6deda8770cfb0d1b0782dcf3bdf?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-32 max-w-full"
            alt="MayNet Logo"
          />
        </div>
        <div className="self-stretch min-w-60 text-white flex-1 shrink basis-[0%] my-auto max-md:max-w-full">
          <h1 className="text-[55px] font-black tracking-[1.65px] max-md:text-[40px]">
            MayNet
          </h1>
          <p className="text-xl font-normal mt-1">
            The pioneer in FinTech Industry
          </p>
        </div>
      </div>
    </div>
  );
};
