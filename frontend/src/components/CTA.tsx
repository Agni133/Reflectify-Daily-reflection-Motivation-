import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function CTA() {
  return (
    <footer className="py-20 text-center  from-indigo-800 via-purple-900 to-slate-900  text-white">
      <h3 className="text-3xl md:text-4xl font-bold mb-6">
        Ready to feel lighter & more focused?
      </h3>
      <Link to="/register">
        <Button className="mt-4 bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 text-lg rounded-full shadow-xl hover:scale-105 transition-transform duration-300">
          Join now <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </Link>
    </footer>
  );
}

