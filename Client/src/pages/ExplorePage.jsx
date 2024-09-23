 
const ExplorePage = () => {
  return (
    <div className="px-4">
        <div className="bg-glass max-w-2xl mx-auto rounded-md p-4">
            <h1 className="text-xl font-bold text-center"> Explore Popular Repositories</h1>
            <div className="flex flex-wrap gap-2 my-2 justify-center">
                <img src="/src/assets/javascript.svg" alt="Javascript Logo" className="h-11 sm:h-20  cursor-pointer" />
                <img src="/src/assets/typescript.svg" alt="Typescript Logo" className="h-11 sm:h-20  cursor-pointer" />
                <img src="/src/assets/c++.svg" alt="c++ Logo" className="h-11 sm:h-20  cursor-pointer" />
                <img src="/src/assets/python.svg" alt="Python Logo" className="h-11 sm:h-20  cursor-pointer" />
                <img src="/src/assets/java.svg" alt="Java Logo" className="h-11 sm:h-20  cursor-pointer" />
                 
            </div>

        </div>

    </div>
  )
}

export default ExplorePage