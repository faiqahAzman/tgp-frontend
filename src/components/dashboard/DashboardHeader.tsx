export const DashboardHeader = () => {
  return (
    <header className="bg-white shadow-[0px_4px_148px_rgba(0,0,0,0.02)] min-h-56 w-full pt-10 pb-[17px] px-5">
      <nav className="flex w-full items-stretch gap-[40px_100px] font-medium justify-between flex-wrap">
        <div className="flex items-center gap-2 text-base text-white h-full w-52 px-4 py-3 rounded-lg bg-gradient-to-r from-[#1D7ABB] via-[#4BB5FF] to-[#4BB5FF]">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/72976518be6a462161a6c0daa6303de24a5c4154855ed38433015087a81d8d06?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-[22px] self-stretch shrink-0 my-auto"
            alt="User icon"
          />
          <span className="self-stretch my-auto">Hello, TGP Ace</span>
        </div>

        <div className="bg-white flex min-w-60 items-center gap-[18px] text-sm text-[rgba(125,128,136,1)] flex-wrap my-auto py-2">
          {[
            {
              icon: "https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/8f1eb7eafd2422ecba8d46f38291819cb32f6625dd0f0ceb312c098d8d1dee66?placeholderIfAbsent=true",
              text: "Participants View",
            },
            {
              icon: "https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/7fad2eb9500afe39685a56153db0ee4abc11a0a3191f80a25355e8a3959f61c7?placeholderIfAbsent=true",
              text: "Board View",
            },
            {
              icon: "https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/34d49e3c769baf0c607e5ea5da03b543c3e281eb5705aeef9f5e295e35dcf98b?placeholderIfAbsent=true",
              text: "List View",
            },
            {
              icon: "https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/c7f851c5439c5bd02659dbf113430ec53711fafa709b5fc4ef09a1377fa47dc4?placeholderIfAbsent=true",
              text: "Power View",
            },
          ].map((item, index) => (
            <button
              key={index}
              className="self-stretch flex items-center gap-1 my-auto hover:text-gray-800"
            >
              <img
                loading="lazy"
                src={item.icon}
                className="aspect-[1] object-contain w-[18px] self-stretch shrink-0 my-auto"
                alt={`${item.text} icon`}
              />
              <span className="self-stretch my-auto">{item.text}</span>
            </button>
          ))}
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/17627470c886086b76293c5bf74d5d5ca05ba40560d5775bba9dd3eaf912d478?placeholderIfAbsent=true"
            className="aspect-[1] object-contain w-[18px] self-stretch shrink-0 my-auto"
            alt="Additional options"
          />
        </div>
      </nav>

      <div className="flex w-full items-center gap-5 justify-center flex-wrap mt-[45px]">
        <div className="self-stretch min-w-60 flex-1 shrink basis-[0%] my-auto">
          <h1 className="text-[40px] font-semibold tracking-[-0.8px] bg-gradient-to-r from-[#01B3DB] via-[#207EC0] to-[#01ED71] to-80% bg-clip-text text-transparent">
            MayNet Microservices Dashboard
          </h1>
          <p className="text-[rgba(184,185,189,1)] text-xl font-normal mt-1">
            Unlocking Financial Insights: Inclusion, Stability & Market Trends
          </p>
        </div>

        <div className="self-stretch min-w-60 w-64 my-auto">
  <div className="flex items-center border border-gray-200 bg-white rounded-[15px] px-3 py-2 w-full">
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/58fbcb3dff7b4e6d972b673ca4440ed0/4258f9c818b9b70a972748ec5dbb3d32d070cfe80895c2edf70c67277e2ebd4d?placeholderIfAbsent=true"
      className="w-[15px] h-[15px] object-contain"
      alt="Search icon"
    />
    <input
      type="text"
      placeholder="Search here..."
      className="ml-2 flex-1 text-xs text-[#A0AEC0] outline-none bg-transparent"
    />
  </div>
</div>

      </div>
    </header>
  );
};
