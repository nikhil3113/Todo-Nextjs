import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createTodo(data:FormData) {
    "use server" //!ensure that it run on server and not visible to client

    const title = data.get("title")?.valueOf();
    if(typeof title!=="string" || title.length === 0){
        throw new Error ("invalid title");
    }

    await prisma.todo.create({data: {title: title, complete:false}})

    redirect('/')
    
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between mb-4 items-center m-5">
        <h1 className="text-3xl">Todos</h1>
      </header>
      <form  action={createTodo} className="flex gap-2 flex-col">
        <input type="text" name="title" className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100" />
        <div className="flex gap-1 justify-end">
            <Link href=".." className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">Cancel</Link>
            <button type="submit" className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">
                Create
            </button>
        </div>
      </form>
    </>
  );
}
