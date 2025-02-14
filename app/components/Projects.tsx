import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  title: string
  description: string
  technologies: string[]
  imageUrl?: string
  githubUrl?: string
  liveUrl?: string
  backgroundColor?: string
}

const projects: Project[] = [
  {
    title: "This website!",
    description:
      "I developed this website as my portfolio to showcase my work. I wanted to do something different, I hope you like it!",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/manuelgomcan/manugomez.dev",
    backgroundColor: "white",
  },
  {
    title: "Coming Soon!",
    description: "Very soon you will see more interesting projects that I will be deploying on my GitHub account, especially related to Artificial Intelligence, Data and Cloud. Stay tuned!",
    technologies: [""],
    githubUrl: "https://github.com/manuelgomcan",
    backgroundColor: "white",
  },
]

export function Projects() {
  return (
    <div className="p-2 md:p-4 lg:p-6 space-y-4 md:space-y-6 overflow-y-auto max-h-full">
      <div className="space-y-2">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold">My Projects</h1>
        <p className="text-xs md:text-sm lg:text-base text-gray-600">
          Here are some of the projects I've worked on. Each demonstrates different aspects of my skills and interests
          in software development.
        </p>
      </div>

      <div className="grid gap-4 md:gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="p-3 md:p-4 lg:p-6 space-y-2 md:space-y-4" style={{ backgroundColor: project.backgroundColor }}>
      <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:gap-4">
        <div>
          <h2 className="text-base md:text-lg lg:text-xl font-bold">{project.title}</h2>
          <p className="text-xs md:text-sm lg:text-base mt-1 md:mt-2">{project.description}</p>
        </div>
        {project.imageUrl && (
          <img
            src={project.imageUrl || "/placeholder.svg"}
            alt={project.title}
            className="w-full md:w-32 h-32 object-cover rounded border"
          />
        )}
      </div>

      <div className="flex flex-wrap gap-1 md:gap-2">
        {project.technologies.map((tech) => (
          <Badge key={tech} variant="secondary" className="text-xs md:text-sm">
            {tech}
          </Badge>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 md:gap-3">
        {project.githubUrl && (
          <Button variant="outline" size="sm" asChild>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 md:gap-2"
            >
              <Github className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline text-xs md:text-sm">View Code</span>
            </a>
          </Button>
        )}
        {project.liveUrl && (
          <Button variant="outline" size="sm" asChild>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 md:gap-2"
            >
              <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline text-xs md:text-sm">Live Demo</span>
            </a>
          </Button>
        )}
      </div>
    </Card>
  )
}

