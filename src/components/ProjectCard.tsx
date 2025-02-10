import { Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubLink: string;
  features: string[]; // Added features prop
}

const ProjectCard = ({ title, description, tags, image, githubLink, features }: ProjectCardProps) => {
  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden h-[400px] relative">
      <div className="flex flex-col md:flex-row h-full">
        {/* Image container */}
        <div className="md:w-1/3 relative h-48 md:h-auto">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Content container */}
        <div className="md:w-2/3 p-9 flex flex-col h-full">
          {/* Top section - fixed at top */}
          <div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">{title}</h3>
            <p className="text-green-600 mb-4">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Middle section - bullet points */}
          <div className="flex-1 flex flex-col justify-center mt-4">
            <ul className="list-disc list-inside text-green-700 space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="text-sm leading-relaxed">{feature}</li>
              ))}
            </ul>
          </div>

          {/* Bottom section - GitHub link */}
          <div className="flex justify-end mt-4">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center p-2 rounded-full hover:bg-green-100 transition-colors"
            >
              <Github className="w-6 h-6 text-green-600" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
