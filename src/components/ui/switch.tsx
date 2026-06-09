import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-[18px] w-8 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-[#CBD2E0] p-[2px] transition-colors outline-none focus-visible:ring-3 focus-visible:ring-[#6D28D9]/30 disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-[#6D28D9]",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="block size-3.5 rounded-full bg-white shadow-sm transition-transform data-checked:translate-x-[14px]"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
