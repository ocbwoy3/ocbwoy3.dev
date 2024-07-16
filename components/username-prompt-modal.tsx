"use client";

/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/wERKETjaEB3
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { BanReturns, getBanInformation } from "@/lib/banParser"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/components/ui/use-toast"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"

const FormSchema = z.object({
  robloxUsername: z.string()
    .min(3, { message: "Username must be 3-20 characters long." })
    .max(20, { message: "Username must be 3-20 characters long." })
    .regex(/^[a-zA-Z0-9%.%_]+$/i, { message: "Invalid Username." }),
})


export function UsernamePromptModal() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      robloxUsername: "",
    },
  })

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    ((window || global) as any).openUsernameInputModal = () => {
      setIsOpen(true)
    }
    ((window || global) as any).closeUsernameInputModal = () => {
      setIsOpen(false)
    }
  }, [])
  
  

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsOpen(false);
    // toast({
    // 	title: "You submitted the following values:",
    // 	description: (
    // 		<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    // 			<code className="text-white">{JSON.stringify(data, null, 2)}</code>
    // 		</pre>
    // 	),
    // })

    toast({
      title: "Fetching Bans",
      description: "Please be patient..."
    })

    // console.log('fetching')

    const x: BanReturns | null = await getBanInformation(data.robloxUsername)

    // console.log('fetchd',x)

    if (x) {
      ((window || global) as any).setBanInfo(x);
      // console.log('sbi')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen absolute bg-stone-600">
      <Dialog open={isOpen} onOpenChange={setIsOpen} {...form}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Roblox Username</DialogTitle>
          </DialogHeader>
          <DialogContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                  control={form.control}
                  name="robloxUsername"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Roblox Username</FormLabel>
                      <FormControl>
                        <Input placeholder="OCboy3" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter a valid Roblox Username in order to check the user if they are banned using a Global Ban Handler.
                        For information about appealing a 112 ban, please visit <a href="https://docs.ocbwoy3.dev/docs/112/appeal/" className=" text-blue-500 underline">the documentation</a>.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Check</Button>
              </form>
            </Form>
          </DialogContent>
        </DialogContent>
      </Dialog>
    </div>
  )
}
