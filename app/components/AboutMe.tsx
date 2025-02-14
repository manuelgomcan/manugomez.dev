interface Technology {
  name: string
  badge: string
}

const technologies: Technology[] = [
  {
    name: "Python",
    badge: "https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54",
  },
  {
    name: "Pandas",
    badge: "https://img.shields.io/badge/pandas-%23150458.svg?style=for-the-badge&logo=pandas&logoColor=white",
  },
  {
    name: "Java",
    badge: "https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white",
  },
  {
    name: "Spring",
    badge: "https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white",
  },
  {
    name: "Docker",
    badge: "https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white",
  },
  {
    name: "AWS",
    badge: "https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white",
  },
  {
    name: "Git",
    badge: "https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white",
  },
  {
    name: "Android",
    badge: "https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white",
  },
  {
    name: "Kotlin",
    badge: "https://img.shields.io/badge/kotlin-%237F52FF.svg?style=for-the-badge&logo=kotlin&logoColor=white",
  },
  {
    name: "Linux",
    badge: "https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black",
  },
]

export function AboutMe() {
  return (
    <div className="p-2 md:p-4 lg:p-6 space-y-4 md:space-y-6 overflow-y-auto max-h-full">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
        <div className="w-full md:w-48 h-48 min-w-[12rem] border-4 border-gray-400 shadow-md">
          <img
            src="/files/mifoto.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-2 md:space-y-4">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold">Manuel Gómez Candelas</h1>
          <p className="text-sm md:text-base lg:text-lg">
            Software Engineering student from Alicante (Spain) who loves technology and is always willing to learn new technologies and skills.
            I am currently exploring <span className="blue-text">Machine Learning / AI</span> and <span className="blue-text">Data Engineering</span> and I am interested in job opportunities in this field.
          </p>
          <p className="text-sm md:text-base lg:text-lg">
            <span className="red-text">Contact me</span> by clicking on the LinkedIn icon or find my contact details in my CV!
          </p>

        </div>
      </div>

      <div className="space-y-2 md:space-y-4">
        <h2 className="text-base md:text-lg lg:text-xl font-bold">Technologies & Skills</h2>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <img
              key={tech.name}
              src={tech.badge || "/placeholder.svg"}
              alt={tech.name}
              className="h-6 md:h-8"
              style={{ imageRendering: "crisp-edges" }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

