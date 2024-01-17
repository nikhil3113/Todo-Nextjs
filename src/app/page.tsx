import { prisma } from "@/db";
import Link from "next/link";
import { TodoItem } from "@/components/TodoItem";

function getTodos() {
  return prisma.todo.findMany()
}

async function toggleTodo(id:string, complete:boolean){
  "use server"

  await prisma.todo.update({where: {id}, data:{complete}})
}

export default async function Home() {

  const todos = await getTodos()

  // await prisma.todo.create({data: {title: "test", complete:false}})

  return <>
    <header className="flex justify-between mb-4 items-center m-5">
      <h1 className="text-3xl">Todos</h1>
      <Link href='/newPage' className="border border-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none text-2xl">New</Link>
    </header>
    <ul className="pl-4">
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
    </ul>
  </>
}