import React from 'react';
import { FileText, Briefcase, GraduationCap, Users, Building, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface UseCase {
  title: string;
  description: string;
  icon?: string;
}

interface PDFToolUseCasesProps {
  useCases: UseCase[];
}

const PDFToolUseCases: React.FC<PDFToolUseCasesProps> = ({ useCases }) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    business: <Briefcase className="h-5 w-5 text-primary" />,
    education: <GraduationCap className="h-5 w-5 text-primary" />,
    personal: <Heart className="h-5 w-5 text-primary" />,
    office: <Building className="h-5 w-5 text-primary" />,
    team: <Users className="h-5 w-5 text-primary" />,
    document: <FileText className="h-5 w-5 text-primary" />,
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Common Use Cases</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {useCases.map((useCase, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {useCase.icon && iconMap[useCase.icon] ? iconMap[useCase.icon] : <FileText className="h-5 w-5 text-primary" />}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground">{useCase.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PDFToolUseCases;
