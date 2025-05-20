
import React, { useState } from 'react';
import { Code2, ArrowLeft, RefreshCw, Copy, Download, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

interface ExplainOption {
  id: string;
  name: string;
  description: string;
}

const CodeExplainer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [explainType, setExplainType] = useState('detailed');
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState('');
  
  // Programming languages supported
  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'sql', label: 'SQL' },
  ];
  
  // Explanation types
  const explainOptions: ExplainOption[] = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Simple explanation for beginners'
    },
    {
      id: 'detailed',
      name: 'Detailed',
      description: 'Comprehensive line-by-line explanation'
    },
    {
      id: 'technical',
      name: 'Technical',
      description: 'Advanced explanation with technical details'
    },
    {
      id: 'optimize',
      name: 'Optimization',
      description: 'Suggestions to improve code efficiency'
    },
    {
      id: 'security',
      name: 'Security Analysis',
      description: 'Identify potential security issues'
    }
  ];
  
  const explainCode = () => {
    if (!code.trim()) {
      toast({
        title: 'No code to explain',
        description: 'Please enter some code first',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    setExplanation('');
    
    // In a real implementation, this would call an AI API
    // For this demo, we'll simulate with a timeout and mock explanations
    setTimeout(() => {
      const result = generateMockExplanation(code, language, explainType);
      setExplanation(result);
      setLoading(false);
      
      toast({
        title: 'Code explained',
        description: `Generated a ${explainOptions.find(opt => opt.id === explainType)?.name.toLowerCase()} explanation`,
      });
    }, 2500);
  };
  
  const generateMockExplanation = (code: string, language: string, type: string): string => {
    // Mock explanations for different languages and types
    const codeLines = code.trim().split('\n').length;
    const containsFunction = code.includes('function') || code.includes('def ');
    const containsClass = code.includes('class ');
    const containsLoop = code.includes('for ') || code.includes('while ');
    const containsCondition = code.includes('if ');
    const containsImport = code.includes('import ') || code.includes('require');
    
    let explanation = '';
    
    // Base explanation based on language
    if (language === 'javascript' || language === 'typescript') {
      explanation += `This is ${language === 'javascript' ? 'JavaScript' : 'TypeScript'} code `;
    } else if (language === 'python') {
      explanation += 'This is Python code ';
    } else {
      explanation += `This is ${languages.find(lang => lang.value === language)?.label || language} code `;
    }
    
    explanation += `consisting of ${codeLines} line${codeLines !== 1 ? 's' : ''}. `;
    
    // Add details based on code structure
    if (containsFunction && containsClass) {
      explanation += 'The code defines a class with one or more methods (functions). ';
    } else if (containsClass) {
      explanation += 'The code defines a class structure. ';
    } else if (containsFunction) {
      explanation += 'The code includes function definitions. ';
    }
    
    if (containsLoop) {
      explanation += 'The code uses loops to iterate over data. ';
    }
    
    if (containsCondition) {
      explanation += 'The code uses conditional statements to control execution flow. ';
    }
    
    if (containsImport) {
      explanation += 'The code imports external modules or libraries. ';
    }
    
    // Add explanation based on type
    if (type === 'basic') {
      explanation += '\n\nBasic Explanation:\n';
      explanation += 'This code performs operations that manipulate data or control program flow. ';
      explanation += 'It uses standard programming constructs like variables, conditionals, and possibly functions. ';
      explanation += 'The code appears to be solving a specific problem or performing a specific task within a larger program.';
    } else if (type === 'detailed') {
      explanation += '\n\nDetailed Explanation:\n';
      explanation += 'Let me break down what each part of the code does:\n\n';
      
      const lines = code.trim().split('\n');
      for (let i = 0; i < Math.min(lines.length, 10); i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        explanation += `Line ${i + 1}: \`${line}\`\n`;
        
        if (line.includes('import') || line.includes('require')) {
          explanation += '- This line imports external functionality into your code, making libraries or modules available for use.\n\n';
        } else if (line.includes('function') || line.includes('def ')) {
          explanation += '- This line defines a function, which is a reusable block of code that performs a specific task.\n\n';
        } else if (line.includes('class')) {
          explanation += '- This line starts a class definition, which is a blueprint for creating objects that share properties and behaviors.\n\n';
        } else if (line.includes('for ') || line.includes('while')) {
          explanation += '- This line starts a loop, which allows code to be executed repeatedly based on certain conditions.\n\n';
        } else if (line.includes('if ') || line.includes('else') || line.includes('switch')) {
          explanation += '- This line contains a conditional statement, which controls the flow of execution based on specified conditions.\n\n';
        } else if (line.includes('return')) {
          explanation += '- This line specifies the value to be returned from a function or method.\n\n';
        } else if (line.includes('=')) {
          explanation += '- This line assigns a value to a variable or property.\n\n';
        } else if (line.includes('{') || line.includes('}') || line.includes(':') && language === 'python') {
          explanation += '- This line defines the structure or scope of a code block.\n\n';
        } else {
          explanation += '- This line performs a specific operation within the code.\n\n';
        }
      }
      
      if (lines.length > 10) {
        explanation += `... (${lines.length - 10} more lines follow a similar pattern)\n\n`;
      }
      
      explanation += 'Overall, this code is designed to perform a specific task by utilizing the programming constructs described above.';
    } else if (type === 'technical') {
      explanation += '\n\nTechnical Explanation:\n';
      explanation += `This ${languages.find(lang => lang.value === language)?.label || language} code implements functionality that interacts with the language's runtime environment and memory model. `;
      
      if (language === 'javascript' || language === 'typescript') {
        explanation += 'JavaScript executes in a single-threaded environment, utilizing an event loop for asynchronous operations. ';
        explanation += 'The code likely interacts with the prototype chain for object inheritance and may involve closure patterns for data encapsulation. ';
        explanation += 'Any asynchronous operations would be handled through callbacks, promises, or async/await syntax, which are built on the JavaScript event loop architecture.';
      } else if (language === 'python') {
        explanation += 'Python uses dynamic typing and reference counting for memory management. ';
        explanation += 'The code operates within Python\'s global interpreter lock (GIL) which affects threading behavior. ';
        explanation += 'Object-oriented patterns in Python utilize duck typing rather than interface implementation, and method resolution follows the C3 linearization algorithm for multiple inheritance.';
      } else if (language === 'java' || language === 'csharp') {
        explanation += 'The code runs on a virtual machine environment with garbage collection for memory management. ';
        explanation += 'Static typing ensures type safety at compile time, while the runtime environment provides features like reflection and runtime type information. ';
        explanation += 'The object-oriented paradigm is fundamental, with inheritance hierarchies, polymorphism, and encapsulation.';
      }
      
      explanation += '\n\nThe implementation logic follows common design patterns for maintainability and performance optimization, taking into account the language\'s specific characteristics and execution environment.';
    } else if (type === 'optimize') {
      explanation += '\n\nOptimization Suggestions:\n';
      explanation += '1. **Time Complexity**: The current implementation might not have optimal time complexity. Consider using more efficient data structures or algorithms if dealing with large datasets.\n\n';
      explanation += '2. **Memory Usage**: Check for memory leaks or excessive object creation. In repetitive operations, consider object pooling or reusing existing instances.\n\n';
      explanation += '3. **Code Duplication**: There may be opportunities to refactor repeated patterns into reusable functions or utilities.\n\n';
      explanation += '4. **Performance Bottlenecks**: Look for nested loops or operations that might be causing performance issues, especially with large inputs.\n\n';
      explanation += '5. **Modern Language Features**: Consider using newer language features that might improve readability and performance.\n\n';
      explanation += '6. **Asynchronous Operations**: For I/O-bound operations, ensure you\'re properly utilizing asynchronous patterns available in your language.\n\n';
      explanation += '7. **Resource Management**: Ensure proper cleanup of resources like file handles, database connections, or network sockets.\n\n';
      explanation += 'Implementing these suggestions could lead to significant improvements in execution speed and resource utilization.';
    } else if (type === 'security') {
      explanation += '\n\nSecurity Analysis:\n';
      explanation += '1. **Input Validation**: Ensure all user inputs are properly validated to prevent injection attacks.\n\n';
      explanation += '2. **Authentication & Authorization**: Verify that access controls are properly implemented for sensitive operations.\n\n';
      explanation += '3. **Data Encryption**: Sensitive data should be encrypted both in transit and at rest.\n\n';
      explanation += '4. **Error Handling**: Check that error messages don\'t reveal sensitive information to potential attackers.\n\n';
      explanation += '5. **Dependency Security**: Ensure all third-party libraries are up to date and free from known vulnerabilities.\n\n';
      explanation += '6. **Session Management**: Verify proper handling of user sessions to prevent session hijacking or fixation.\n\n';
      explanation += '7. **Cross-Site Scripting (XSS)**: Ensure output is properly escaped or sanitized to prevent XSS attacks.\n\n';
      explanation += '8. **CSRF Protection**: Implement appropriate protections against Cross-Site Request Forgery attacks.\n\n';
      explanation += 'Addressing these security considerations will help protect your application from common vulnerabilities and attacks.';
    }
    
    return explanation;
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    
    toast({
      title: 'Copied to clipboard',
      description: 'Text has been copied to clipboard',
    });
  };
  
  const downloadExplanation = () => {
    if (!explanation) {
      toast({
        title: 'No explanation to download',
        description: 'Please generate an explanation first',
        variant: 'destructive',
      });
      return;
    }
    
    const blob = new Blob([explanation], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `code_explanation_${language}.txt`;
    document.body.appendChild(a);
    a.click();
    
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast({
      title: 'Explanation downloaded',
      description: 'Your explanation has been downloaded as a text file',
    });
  };

  // Load example code for selected language
  const loadExample = () => {
    let exampleCode = '';
    
    switch (language) {
      case 'javascript':
        exampleCode = `// Simple JavaScript function to calculate factorial
function factorial(n) {
  // Base case
  if (n === 0 || n === 1) {
    return 1;
  }
  
  // Recursive case
  return n * factorial(n - 1);
}

// Example usage
const number = 5;
const result = factorial(number);
console.log(\`The factorial of \${number} is \${result}\`);`;
        break;
      case 'python':
        exampleCode = `# Simple Python function to calculate factorial
def factorial(n):
    # Base case
    if n == 0 or n == 1:
        return 1
    
    # Recursive case
    return n * factorial(n - 1)

# Example usage
number = 5
result = factorial(number)
print(f"The factorial of {number} is {result}")`;
        break;
      case 'java':
        exampleCode = `// Simple Java method to calculate factorial
public class FactorialExample {
    public static int factorial(int n) {
        // Base case
        if (n == 0 || n == 1) {
            return 1;
        }
        
        // Recursive case
        return n * factorial(n - 1);
    }
    
    public static void main(String[] args) {
        int number = 5;
        int result = factorial(number);
        System.out.println("The factorial of " + number + " is " + result);
    }
}`;
        break;
      default:
        exampleCode = `// Example code for ${languages.find(lang => lang.value === language)?.label || language}
// This is a placeholder example.
// Please paste your actual code for a detailed explanation.`;
    }
    
    setCode(exampleCode);
    
    toast({
      title: 'Example loaded',
      description: `Loaded example ${languages.find(lang => lang.value === language)?.label || language} code`,
    });
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 mb-4 rounded-full bg-primary/10">
            <Code2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Code Explainer</h1>
          <p className="text-muted-foreground mt-2">Get detailed explanations of code snippets</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Code Input</CardTitle>
              <CardDescription>Paste your code and select options for explanation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="language">Programming Language</Label>
                  <div className="flex gap-2 mt-1.5">
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language" className="flex-1">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      onClick={loadExample}
                      disabled={loading}
                    >
                      Load Example
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="explain-type">Explanation Type</Label>
                  <Select value={explainType} onValueChange={setExplainType} className="mt-1.5">
                    <SelectTrigger id="explain-type">
                      <SelectValue placeholder="Select explanation type" />
                    </SelectTrigger>
                    <SelectContent>
                      {explainOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name} - {option.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="code">Code</Label>
                <Textarea
                  id="code"
                  placeholder="Paste your code here..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="font-mono text-sm h-[300px] mt-1.5"
                />
              </div>
              
              <Button
                onClick={explainCode}
                disabled={!code.trim() || loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing Code...
                  </>
                ) : (
                  'Explain Code'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {(explanation || loading) && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Explanation</CardTitle>
                  <CardDescription>
                    {explainOptions.find(opt => opt.id === explainType)?.name} explanation of your code
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadExplanation}
                    disabled={!explanation || loading}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(explanation)}
                    disabled={!explanation || loading}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center py-16">
                  <div className="flex flex-col items-center">
                    <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
                    <p className="text-muted-foreground">Analyzing your code and generating explanation...</p>
                  </div>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap">{explanation}</pre>
                </div>
              )}
            </CardContent>
            <div className="px-6 py-4 bg-muted/50 text-xs text-muted-foreground">
              <p>Note: For full functionality, this would integrate with an AI API like OpenAI's GPT models, which requires an API key.</p>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default CodeExplainer;
