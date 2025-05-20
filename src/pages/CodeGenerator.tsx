
import React, { useState } from 'react';
import { Code, ArrowLeft, RefreshCw, Copy, Download, Sparkles, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';

interface CodeLanguage {
  value: string;
  label: string;
}

const CodeGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [includeComments, setIncludeComments] = useState(true);
  const [includeTests, setIncludeTests] = useState(false);
  
  // Available programming languages
  const languages: CodeLanguage[] = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'sql', label: 'SQL' },
  ];
  
  // Example prompts
  const examplePrompts = [
    "Create a function that sorts an array using the quicksort algorithm",
    "Generate a class for a banking system with deposits and withdrawals",
    "Write a REST API endpoint for user registration",
    "Create a responsive navigation menu with CSS and JavaScript",
    "Program that calculates the Fibonacci sequence up to n terms",
  ];
  
  const generateCode = () => {
    if (!prompt.trim()) {
      toast({
        title: 'Prompt required',
        description: 'Please enter a description of the code you want to generate',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    setGeneratedCode('');
    
    // In a real implementation, you would call an AI API here
    // For this demo, we'll simulate with a timeout and mock data
    setTimeout(() => {
      const code = generateMockCode(prompt, language, includeComments, includeTests);
      setGeneratedCode(code);
      setLoading(false);
      
      toast({
        title: 'Code generated',
        description: `Generated ${languages.find(lang => lang.value === language)?.label || language} code`,
      });
    }, 2000);
  };
  
  const generateMockCode = (
    prompt: string, 
    language: string, 
    withComments: boolean,
    withTests: boolean
  ): string => {
    let code = '';
    
    // Generate code based on prompt keywords and selected language
    const promptLower = prompt.toLowerCase();
    
    if (language === 'javascript' || language === 'typescript') {
      // JavaScript/TypeScript code
      const isTypescript = language === 'typescript';
      
      if (withComments) {
        code += `/**\n * ${prompt}\n * Generated code example\n */\n\n`;
      }
      
      if (promptLower.includes('sort') || promptLower.includes('array')) {
        if (isTypescript) {
          code += `function quickSort<T>(arr: T[]): T[] {\n`;
          code += `  if (arr.length <= 1) {\n`;
          code += `    return arr;\n`;
          code += `  }\n\n`;
          
          if (withComments) {
            code += `  // Choose pivot and partition array\n`;
          }
          
          code += `  const pivot: T = arr[Math.floor(arr.length / 2)];\n`;
          code += `  const left: T[] = [];\n`;
          code += `  const middle: T[] = [];\n`;
          code += `  const right: T[] = [];\n\n`;
          
          code += `  // Partition array into elements less than, equal to, and greater than pivot\n`;
          code += `  for (const element of arr) {\n`;
          code += `    if (element < pivot) {\n`;
          code += `      left.push(element);\n`;
          code += `    } else if (element > pivot) {\n`;
          code += `      right.push(element);\n`;
          code += `    } else {\n`;
          code += `      middle.push(element);\n`;
          code += `    }\n`;
          code += `  }\n\n`;
          
          code += `  // Recursively sort subarrays and combine\n`;
          code += `  return [...quickSort(left), ...middle, ...quickSort(right)];\n`;
          code += `}\n`;
          
          if (withTests) {
            code += `\n// Test the quickSort function\n`;
            code += `function testQuickSort(): void {\n`;
            code += `  const unsortedArray: number[] = [9, 3, 7, 1, 5, 8, 2, 4, 6];\n`;
            code += `  const sortedArray: number[] = quickSort(unsortedArray);\n`;
            code += `  console.log('Original array:', unsortedArray);\n`;
            code += `  console.log('Sorted array:', sortedArray);\n`;
            code += `  \n`;
            code += `  // Verify the result\n`;
            code += `  const expectedResult: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];\n`;
            code += `  const isCorrect: boolean = JSON.stringify(sortedArray) === JSON.stringify(expectedResult);\n`;
            code += `  console.log('Sorting correct:', isCorrect);\n`;
            code += `}\n\n`;
            code += `testQuickSort();\n`;
          }
        } else {
          code += `function quickSort(arr) {\n`;
          code += `  if (arr.length <= 1) {\n`;
          code += `    return arr;\n`;
          code += `  }\n\n`;
          
          if (withComments) {
            code += `  // Choose pivot and partition array\n`;
          }
          
          code += `  const pivot = arr[Math.floor(arr.length / 2)];\n`;
          code += `  const left = [];\n`;
          code += `  const middle = [];\n`;
          code += `  const right = [];\n\n`;
          
          code += `  // Partition array into elements less than, equal to, and greater than pivot\n`;
          code += `  for (const element of arr) {\n`;
          code += `    if (element < pivot) {\n`;
          code += `      left.push(element);\n`;
          code += `    } else if (element > pivot) {\n`;
          code += `      right.push(element);\n`;
          code += `    } else {\n`;
          code += `      middle.push(element);\n`;
          code += `    }\n`;
          code += `  }\n\n`;
          
          code += `  // Recursively sort subarrays and combine\n`;
          code += `  return [...quickSort(left), ...middle, ...quickSort(right)];\n`;
          code += `}\n`;
          
          if (withTests) {
            code += `\n// Test the quickSort function\n`;
            code += `const unsortedArray = [9, 3, 7, 1, 5, 8, 2, 4, 6];\n`;
            code += `const sortedArray = quickSort(unsortedArray);\n`;
            code += `console.log('Original array:', unsortedArray);\n`;
            code += `console.log('Sorted array:', sortedArray);\n`;
            code += `\n`;
            code += `// Verify the result\n`;
            code += `const expectedResult = [1, 2, 3, 4, 5, 6, 7, 8, 9];\n`;
            code += `const isCorrect = JSON.stringify(sortedArray) === JSON.stringify(expectedResult);\n`;
            code += `console.log('Sorting correct:', isCorrect);\n`;
          }
        }
      } else if (promptLower.includes('class') || promptLower.includes('bank')) {
        if (isTypescript) {
          code += `class BankAccount {\n`;
          code += `  private accountNumber: string;\n`;
          code += `  private accountHolder: string;\n`;
          code += `  private balance: number;\n\n`;
          
          if (withComments) {
            code += `  /**\n`;
            code += `   * Create a new bank account\n`;
            code += `   * @param accountNumber - Unique account identifier\n`;
            code += `   * @param accountHolder - Name of the account holder\n`;
            code += `   * @param initialBalance - Starting balance (default: 0)\n`;
            code += `   */\n`;
          }
          
          code += `  constructor(accountNumber: string, accountHolder: string, initialBalance: number = 0) {\n`;
          code += `    this.accountNumber = accountNumber;\n`;
          code += `    this.accountHolder = accountHolder;\n`;
          code += `    this.balance = initialBalance;\n`;
          code += `  }\n\n`;
          
          if (withComments) {
            code += `  /**\n`;
            code += `   * Deposit money into the account\n`;
            code += `   * @param amount - Amount to deposit (must be positive)\n`;
            code += `   * @returns The new balance\n`;
            code += `   */\n`;
          }
          
          code += `  deposit(amount: number): number {\n`;
          code += `    if (amount <= 0) {\n`;
          code += `      throw new Error('Deposit amount must be positive');\n`;
          code += `    }\n`;
          code += `    this.balance += amount;\n`;
          code += `    return this.balance;\n`;
          code += `  }\n\n`;
          
          if (withComments) {
            code += `  /**\n`;
            code += `   * Withdraw money from the account\n`;
            code += `   * @param amount - Amount to withdraw (must be positive and not exceed balance)\n`;
            code += `   * @returns The new balance\n`;
            code += `   */\n`;
          }
          
          code += `  withdraw(amount: number): number {\n`;
          code += `    if (amount <= 0) {\n`;
          code += `      throw new Error('Withdrawal amount must be positive');\n`;
          code += `    }\n`;
          code += `    if (amount > this.balance) {\n`;
          code += `      throw new Error('Insufficient funds');\n`;
          code += `    }\n`;
          code += `    this.balance -= amount;\n`;
          code += `    return this.balance;\n`;
          code += `  }\n\n`;
          
          code += `  getBalance(): number {\n`;
          code += `    return this.balance;\n`;
          code += `  }\n\n`;
          
          code += `  getAccountInfo(): { accountNumber: string; accountHolder: string; balance: number } {\n`;
          code += `    return {\n`;
          code += `      accountNumber: this.accountNumber,\n`;
          code += `      accountHolder: this.accountHolder,\n`;
          code += `      balance: this.balance,\n`;
          code += `    };\n`;
          code += `  }\n`;
          code += `}\n`;
          
          if (withTests) {
            code += `\n// Test the BankAccount class\n`;
            code += `function testBankAccount(): void {\n`;
            code += `  const account = new BankAccount('123456789', 'John Doe', 1000);\n`;
            code += `  \n`;
            code += `  console.log('Initial account info:', account.getAccountInfo());\n`;
            code += `  \n`;
            code += `  // Test deposits\n`;
            code += `  console.log('After deposit:', account.deposit(500));\n`;
            code += `  \n`;
            code += `  // Test withdrawals\n`;
            code += `  console.log('After withdrawal:', account.withdraw(200));\n`;
            code += `  \n`;
            code += `  // Test final balance\n`;
            code += `  console.log('Final balance:', account.getBalance());\n`;
            code += `}\n\n`;
            code += `testBankAccount();\n`;
          }
        } else {
          code += `class BankAccount {\n`;
          
          if (withComments) {
            code += `  /**\n`;
            code += `   * Create a new bank account\n`;
            code += `   * @param {string} accountNumber - Unique account identifier\n`;
            code += `   * @param {string} accountHolder - Name of the account holder\n`;
            code += `   * @param {number} initialBalance - Starting balance (default: 0)\n`;
            code += `   */\n`;
          }
          
          code += `  constructor(accountNumber, accountHolder, initialBalance = 0) {\n`;
          code += `    this.accountNumber = accountNumber;\n`;
          code += `    this.accountHolder = accountHolder;\n`;
          code += `    this.balance = initialBalance;\n`;
          code += `  }\n\n`;
          
          if (withComments) {
            code += `  /**\n`;
            code += `   * Deposit money into the account\n`;
            code += `   * @param {number} amount - Amount to deposit (must be positive)\n`;
            code += `   * @returns {number} The new balance\n`;
            code += `   */\n`;
          }
          
          code += `  deposit(amount) {\n`;
          code += `    if (amount <= 0) {\n`;
          code += `      throw new Error('Deposit amount must be positive');\n`;
          code += `    }\n`;
          code += `    this.balance += amount;\n`;
          code += `    return this.balance;\n`;
          code += `  }\n\n`;
          
          if (withComments) {
            code += `  /**\n`;
            code += `   * Withdraw money from the account\n`;
            code += `   * @param {number} amount - Amount to withdraw (must be positive and not exceed balance)\n`;
            code += `   * @returns {number} The new balance\n`;
            code += `   */\n`;
          }
          
          code += `  withdraw(amount) {\n`;
          code += `    if (amount <= 0) {\n`;
          code += `      throw new Error('Withdrawal amount must be positive');\n`;
          code += `    }\n`;
          code += `    if (amount > this.balance) {\n`;
          code += `      throw new Error('Insufficient funds');\n`;
          code += `    }\n`;
          code += `    this.balance -= amount;\n`;
          code += `    return this.balance;\n`;
          code += `  }\n\n`;
          
          code += `  getBalance() {\n`;
          code += `    return this.balance;\n`;
          code += `  }\n\n`;
          
          code += `  getAccountInfo() {\n`;
          code += `    return {\n`;
          code += `      accountNumber: this.accountNumber,\n`;
          code += `      accountHolder: this.accountHolder,\n`;
          code += `      balance: this.balance,\n`;
          code += `    };\n`;
          code += `  }\n`;
          code += `}\n`;
          
          if (withTests) {
            code += `\n// Test the BankAccount class\n`;
            code += `const account = new BankAccount('123456789', 'John Doe', 1000);\n\n`;
            code += `console.log('Initial account info:', account.getAccountInfo());\n\n`;
            code += `// Test deposits\n`;
            code += `console.log('After deposit:', account.deposit(500));\n\n`;
            code += `// Test withdrawals\n`;
            code += `console.log('After withdrawal:', account.withdraw(200));\n\n`;
            code += `// Test final balance\n`;
            code += `console.log('Final balance:', account.getBalance());\n`;
          }
        }
      } else {
        if (isTypescript) {
          code += `// Generic TypeScript function based on your prompt\n`;
          code += `function processData<T, U>(input: T): U {\n`;
          code += `  // Implementation based on your requirements\n`;
          code += `  console.log('Processing input:', input);\n\n`;
          
          code += `  // This is a placeholder implementation\n`;
          code += `  // Replace with actual logic based on your needs\n`;
          code += `  const result = { processed: true, input } as unknown as U;\n\n`;
          
          code += `  return result;\n`;
          code += `}\n\n`;
          
          code += `// Example usage\n`;
          code += `const input = { data: 'example' };\n`;
          code += `const result = processData<typeof input, { processed: boolean; input: typeof input }>(input);\n`;
          code += `console.log('Result:', result);\n`;
        } else {
          code += `// Generic JavaScript function based on your prompt\n`;
          code += `function processData(input) {\n`;
          code += `  // Implementation based on your requirements\n`;
          code += `  console.log('Processing input:', input);\n\n`;
          
          code += `  // This is a placeholder implementation\n`;
          code += `  // Replace with actual logic based on your needs\n`;
          code += `  const result = { processed: true, input };\n\n`;
          
          code += `  return result;\n`;
          code += `}\n\n`;
          
          code += `// Example usage\n`;
          code += `const input = { data: 'example' };\n`;
          code += `const result = processData(input);\n`;
          code += `console.log('Result:', result);\n`;
        }
      }
    } else if (language === 'python') {
      // Python code
      if (withComments) {
        code += '"""\n' + prompt + '\nGenerated code example\n"""\n\n';
      }
      
      if (promptLower.includes('sort') || promptLower.includes('array')) {
        code += 'def quick_sort(arr):\n';
        code += '    """Quick sort implementation to sort an array.\n';
        code += '    \n';
        code += '    Args:\n';
        code += '        arr: List to be sorted\n';
        code += '    \n';
        code += '    Returns:\n';
        code += '        Sorted list\n';
        code += '    """\n';
        code += '    if len(arr) <= 1:\n';
        code += '        return arr\n';
        code += '    \n';
        
        if (withComments) {
          code += '    # Choose pivot and partition array\n';
        }
        
        code += '    pivot = arr[len(arr) // 2]\n';
        code += '    left = [x for x in arr if x < pivot]\n';
        code += '    middle = [x for x in arr if x == pivot]\n';
        code += '    right = [x for x in arr if x > pivot]\n';
        code += '    \n';
        code += '    # Recursively sort subarrays and combine\n';
        code += '    return quick_sort(left) + middle + quick_sort(right)\n\n';
        
        if (withTests) {
          code += '# Test the quick_sort function\n';
          code += 'def test_quick_sort():\n';
          code += '    unsorted_array = [9, 3, 7, 1, 5, 8, 2, 4, 6]\n';
          code += '    sorted_array = quick_sort(unsorted_array)\n';
          code += '    print("Original array:", unsorted_array)\n';
          code += '    print("Sorted array:", sorted_array)\n';
          code += '    \n';
          code += '    # Verify the result\n';
          code += '    expected_result = [1, 2, 3, 4, 5, 6, 7, 8, 9]\n';
          code += '    is_correct = sorted_array == expected_result\n';
          code += '    print("Sorting correct:", is_correct)\n\n';
          code += 'if __name__ == "__main__":\n';
          code += '    test_quick_sort()\n';
        }
      } else if (promptLower.includes('class') || promptLower.includes('bank')) {
        code += 'class BankAccount:\n';
        
        if (withComments) {
          code += '    """A class representing a bank account.\n';
          code += '    \n';
          code += '    Attributes:\n';
          code += '        account_number: Unique account identifier.\n';
          code += '        account_holder: Name of the account holder.\n';
          code += '        balance: Current balance in the account.\n';
          code += '    """\n';
        }
        
        code += '    def __init__(self, account_number, account_holder, initial_balance=0):\n';
        code += '        """Initialize a new bank account.\n';
        code += '        \n';
        code += '        Args:\n';
        code += '            account_number: Unique account identifier.\n';
        code += '            account_holder: Name of the account holder.\n';
        code += '            initial_balance: Starting balance (default: 0).\n';
        code += '        """\n';
        code += '        self.account_number = account_number\n';
        code += '        self.account_holder = account_holder\n';
        code += '        self.balance = initial_balance\n';
        code += '    \n';
        code += '    def deposit(self, amount):\n';
        code += '        """Deposit money into the account.\n';
        code += '        \n';
        code += '        Args:\n';
        code += '            amount: Amount to deposit (must be positive).\n';
        code += '            \n';
        code += '        Returns:\n';
        code += '            The new balance.\n';
        code += '            \n';
        code += '        Raises:\n';
        code += '            ValueError: If amount is not positive.\n';
        code += '        """\n';
        code += '        if amount <= 0:\n';
        code += '            raise ValueError("Deposit amount must be positive")\n';
        code += '        self.balance += amount\n';
        code += '        return self.balance\n';
        code += '    \n';
        code += '    def withdraw(self, amount):\n';
        code += '        """Withdraw money from the account.\n';
        code += '        \n';
        code += '        Args:\n';
        code += '            amount: Amount to withdraw (must be positive and not exceed balance).\n';
        code += '            \n';
        code += '        Returns:\n';
        code += '            The new balance.\n';
        code += '            \n';
        code += '        Raises:\n';
        code += '            ValueError: If amount is not positive or exceeds the balance.\n';
        code += '        """\n';
        code += '        if amount <= 0:\n';
        code += '            raise ValueError("Withdrawal amount must be positive")\n';
        code += '        if amount > self.balance:\n';
        code += '            raise ValueError("Insufficient funds")\n';
        code += '        self.balance -= amount\n';
        code += '        return self.balance\n';
        code += '    \n';
        code += '    def get_balance(self):\n';
        code += '        """Get the current balance.\n';
        code += '        \n';
        code += '        Returns:\n';
        code += '            The current balance.\n';
        code += '        """\n';
        code += '        return self.balance\n';
        code += '    \n';
        code += '    def get_account_info(self):\n';
        code += '        """Get all account information.\n';
        code += '        \n';
        code += '        Returns:\n';
        code += '            A dictionary containing account details.\n';
        code += '        """\n';
        code += '        return {\n';
        code += '            "account_number": self.account_number,\n';
        code += '            "account_holder": self.account_holder,\n';
        code += '            "balance": self.balance\n';
        code += '        }\n';
        
        if (withTests) {
          code += '\n# Test the BankAccount class\n';
          code += 'def test_bank_account():\n';
          code += '    account = BankAccount("123456789", "John Doe", 1000)\n';
          code += '    \n';
          code += '    print("Initial account info:", account.get_account_info())\n';
          code += '    \n';
          code += '    # Test deposits\n';
          code += '    print("After deposit:", account.deposit(500))\n';
          code += '    \n';
          code += '    # Test withdrawals\n';
          code += '    print("After withdrawal:", account.withdraw(200))\n';
          code += '    \n';
          code += '    # Test final balance\n';
          code += '    print("Final balance:", account.get_balance())\n\n';
          code += 'if __name__ == "__main__":\n';
          code += '    test_bank_account()\n';
        }
      } else {
        code += 'def process_data(input_data):\n';
        code += '    """Process the input data based on requirements.\n';
        code += '    \n';
        code += '    Args:\n';
        code += '        input_data: The data to be processed.\n';
        code += '        \n';
        code += '    Returns:\n';
        code += '        Processed data result.\n';
        code += '    """\n';
        code += '    # Implementation based on your requirements\n';
        code += '    print("Processing input:", input_data)\n';
        code += '    \n';
        code += '    # This is a placeholder implementation\n';
        code += '    # Replace with actual logic based on your needs\n';
        code += '    result = {"processed": True, "input": input_data}\n';
        code += '    \n';
        code += '    return result\n\n';
        code += '# Example usage\n';
        code += 'input_data = {"data": "example"}\n';
        code += 'result = process_data(input_data)\n';
        code += 'print("Result:", result)\n';
      }
    } else if (language === 'java') {
      // Java code
      if (withComments) {
        code += '/**\n * ' + prompt + '\n * Generated code example\n */\n\n';
      }
      
      if (promptLower.includes('sort') || promptLower.includes('array')) {
        code += 'import java.util.Arrays;\n\n';
        code += 'public class QuickSortExample {\n\n';
        
        if (withComments) {
          code += '    /**\n';
          code += '     * Sorts an array using the quicksort algorithm.\n';
          code += '     * @param arr The array to be sorted\n';
          code += '     * @return The sorted array\n';
          code += '     */\n';
        }
        
        code += '    public static int[] quickSort(int[] arr) {\n';
        code += '        if (arr.length <= 1) {\n';
        code += '            return arr;\n';
        code += '        }\n\n';
        
        code += '        // Create a copy of the array to avoid modifying the original\n';
        code += '        int[] result = Arrays.copyOf(arr, arr.length);\n';
        code += '        quickSortHelper(result, 0, result.length - 1);\n';
        code += '        return result;\n';
        code += '    }\n\n';
        
        code += '    private static void quickSortHelper(int[] arr, int low, int high) {\n';
        code += '        if (low < high) {\n';
        code += '            // Partition the array and get the pivot position\n';
        code += '            int pivotPos = partition(arr, low, high);\n';
        code += '            \n';
        code += '            // Recursively sort the subarrays\n';
        code += '            quickSortHelper(arr, low, pivotPos - 1);\n';
        code += '            quickSortHelper(arr, pivotPos + 1, high);\n';
        code += '        }\n';
        code += '    }\n\n';
        
        code += '    private static int partition(int[] arr, int low, int high) {\n';
        code += '        // Choose the rightmost element as pivot\n';
        code += '        int pivot = arr[high];\n';
        code += '        int i = low - 1; // Index of smaller element\n';
        code += '        \n';
        code += '        for (int j = low; j < high; j++) {\n';
        code += '            // If current element is smaller than the pivot\n';
        code += '            if (arr[j] <= pivot) {\n';
        code += '                i++;\n';
        code += '                \n';
        code += '                // Swap arr[i] and arr[j]\n';
        code += '                int temp = arr[i];\n';
        code += '                arr[i] = arr[j];\n';
        code += '                arr[j] = temp;\n';
        code += '            }\n';
        code += '        }\n';
        code += '        \n';
        code += '        // Swap arr[i+1] and arr[high] (put the pivot in its correct position)\n';
        code += '        int temp = arr[i + 1];\n';
        code += '        arr[i + 1] = arr[high];\n';
        code += '        arr[high] = temp;\n';
        code += '        \n';
        code += '        return i + 1;\n';
        code += '    }\n\n';
        
        if (withTests) {
          code += '    public static void main(String[] args) {\n';
          code += '        // Test the quickSort function\n';
          code += '        int[] unsortedArray = {9, 3, 7, 1, 5, 8, 2, 4, 6};\n';
          code += '        int[] sortedArray = quickSort(unsortedArray);\n';
          code += '        \n';
          code += '        System.out.print("Original array: ");\n';
          code += '        for (int num : unsortedArray) {\n';
          code += '            System.out.print(num + " ");\n';
          code += '        }\n';
          code += '        System.out.println();\n';
          code += '        \n';
          code += '        System.out.print("Sorted array: ");\n';
          code += '        for (int num : sortedArray) {\n';
          code += '            System.out.print(num + " ");\n';
          code += '        }\n';
          code += '        System.out.println();\n';
          code += '        \n';
          code += '        // Verify the result\n';
          code += '        int[] expectedResult = {1, 2, 3, 4, 5, 6, 7, 8, 9};\n';
          code += '        boolean isCorrect = Arrays.equals(sortedArray, expectedResult);\n';
          code += '        System.out.println("Sorting correct: " + isCorrect);\n';
          code += '    }\n';
        }
        
        code += '}\n';
      } else if (promptLower.includes('class') || promptLower.includes('bank')) {
        code += 'public class BankAccount {\n';
        code += '    private final String accountNumber;\n';
        code += '    private final String accountHolder;\n';
        code += '    private double balance;\n\n';
        
        if (withComments) {
          code += '    /**\n';
          code += '     * Create a new bank account.\n';
          code += '     * @param accountNumber Unique account identifier\n';
          code += '     * @param accountHolder Name of the account holder\n';
          code += '     * @param initialBalance Starting balance (default: 0)\n';
          code += '     */\n';
        }
        
        code += '    public BankAccount(String accountNumber, String accountHolder, double initialBalance) {\n';
        code += '        this.accountNumber = accountNumber;\n';
        code += '        this.accountHolder = accountHolder;\n';
        code += '        this.balance = initialBalance;\n';
        code += '    }\n\n';
        
        code += '    public BankAccount(String accountNumber, String accountHolder) {\n';
        code += '        this(accountNumber, accountHolder, 0.0);\n';
        code += '    }\n\n';
        
        if (withComments) {
          code += '    /**\n';
          code += '     * Deposit money into the account.\n';
          code += '     * @param amount Amount to deposit (must be positive)\n';
          code += '     * @return The new balance\n';
          code += '     * @throws IllegalArgumentException if amount is not positive\n';
          code += '     */\n';
        }
        
        code += '    public double deposit(double amount) {\n';
        code += '        if (amount <= 0) {\n';
        code += '            throw new IllegalArgumentException("Deposit amount must be positive");\n';
        code += '        }\n';
        code += '        this.balance += amount;\n';
        code += '        return this.balance;\n';
        code += '    }\n\n';
        
        if (withComments) {
          code += '    /**\n';
          code += '     * Withdraw money from the account.\n';
          code += '     * @param amount Amount to withdraw (must be positive and not exceed balance)\n';
          code += '     * @return The new balance\n';
          code += '     * @throws IllegalArgumentException if amount is not positive or exceeds the balance\n';
          code += '     */\n';
        }
        
        code += '    public double withdraw(double amount) {\n';
        code += '        if (amount <= 0) {\n';
        code += '            throw new IllegalArgumentException("Withdrawal amount must be positive");\n';
        code += '        }\n';
        code += '        if (amount > this.balance) {\n';
        code += '            throw new IllegalArgumentException("Insufficient funds");\n';
        code += '        }\n';
        code += '        this.balance -= amount;\n';
        code += '        return this.balance;\n';
        code += '    }\n\n';
        
        code += '    public double getBalance() {\n';
        code += '        return this.balance;\n';
        code += '    }\n\n';
        
        code += '    public String getAccountNumber() {\n';
        code += '        return this.accountNumber;\n';
        code += '    }\n\n';
        
        code += '    public String getAccountHolder() {\n';
        code += '        return this.accountHolder;\n';
        code += '    }\n\n';
        
        code += '    @Override\n';
        code += '    public String toString() {\n';
        code += '        return "BankAccount{" +\n';
        code += '                "accountNumber=\'" + accountNumber + "\'" +\n';
        code += '                ", accountHolder=\'" + accountHolder + "\'" +\n';
        code += '                ", balance=" + balance +\n';
        code += '                "}";\n';
        code += '    }\n';
        
        if (withTests) {
          code += '\n    public static void main(String[] args) {\n';
          code += '        // Test the BankAccount class\n';
          code += '        BankAccount account = new BankAccount("123456789", "John Doe", 1000);\n';
          code += '        \n';
          code += '        System.out.println("Initial account info: " + account);\n';
          code += '        \n';
          code += '        // Test deposits\n';
          code += '        System.out.println("After deposit: " + account.deposit(500));\n';
          code += '        \n';
          code += '        // Test withdrawals\n';
          code += '        System.out.println("After withdrawal: " + account.withdraw(200));\n';
          code += '        \n';
          code += '        // Test final balance\n';
          code += '        System.out.println("Final balance: " + account.getBalance());\n';
          code += '    }\n';
        }
        
        code += '}\n';
      } else {
        code += 'public class GeneratedCode {\n';
        
        if (withComments) {
          code += '    /**\n';
          code += '     * Process the input data based on requirements.\n';
          code += '     * @param input The data to be processed\n';
          code += '     * @return Processed data result\n';
          code += '     */\n';
        }
        
        code += '    public static Object processData(Object input) {\n';
        code += '        // Implementation based on your requirements\n';
        code += '        System.out.println("Processing input: " + input);\n\n';
        
        code += '        // This is a placeholder implementation\n';
        code += '        // Replace with actual logic based on your needs\n';
        code += '        return new Result(true, input);\n';
        code += '    }\n\n';
        
        code += '    static class Result {\n';
        code += '        private final boolean processed;\n';
        code += '        private final Object input;\n\n';
        
        code += '        public Result(boolean processed, Object input) {\n';
        code += '            this.processed = processed;\n';
        code += '            this.input = input;\n';
        code += '        }\n\n';
        
        code += '        @Override\n';
        code += '        public String toString() {\n';
        code += '            return "Result{" +\n';
        code += '                    "processed=" + processed +\n';
        code += '                    ", input=" + input +\n';
        code += '                    "}";\n';
        code += '        }\n';
        code += '    }\n\n';
        
        if (withTests) {
          code += '    public static void main(String[] args) {\n';
          code += '        // Example usage\n';
          code += '        String input = "example";\n';
          code += '        Object result = processData(input);\n';
          code += '        System.out.println("Result: " + result);\n';
          code += '    }\n';
        }
        
        code += '}\n';
      }
    } else {
      // Generic code for other languages
      code += `// ${languages.find(lang => lang.value === language)?.label || language} code example based on your prompt\n`;
      code += `// This is a placeholder implementation\n\n`;
      
      if (language === 'html') {
        code += '<!DOCTYPE html>\n';
        code += '<html lang="en">\n';
        code += '<head>\n';
        code += '    <meta charset="UTF-8">\n';
        code += '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
        code += '    <title>Generated HTML</title>\n';
        code += '    <style>\n';
        code += '        body {\n';
        code += '            font-family: Arial, sans-serif;\n';
        code += '            line-height: 1.6;\n';
        code += '            margin: 0;\n';
        code += '            padding: 20px;\n';
        code += '        }\n';
        code += '        .container {\n';
        code += '            max-width: 800px;\n';
        code += '            margin: 0 auto;\n';
        code += '            padding: 20px;\n';
        code += '            border: 1px solid #ddd;\n';
        code += '            border-radius: 5px;\n';
        code += '        }\n';
        code += '    </style>\n';
        code += '</head>\n';
        code += '<body>\n';
        code += '    <div class="container">\n';
        code += '        <h1>Generated HTML Content</h1>\n';
        code += '        <p>This is a sample HTML document created based on your prompt: "' + prompt + '"</p>\n';
        code += '        \n';
        code += '        <section>\n';
        code += '            <h2>Main Content</h2>\n';
        code += '            <p>Replace this with your actual content.</p>\n';
        code += '        </section>\n';
        code += '    </div>\n';
        code += '</body>\n';
        code += '</html>';
      } else if (language === 'css') {
        code += '/* CSS styles based on your prompt */\n\n';
        code += '/* Reset some default styles */\n';
        code += '* {\n';
        code += '    margin: 0;\n';
        code += '    padding: 0;\n';
        code += '    box-sizing: border-box;\n';
        code += '}\n\n';
        
        code += 'body {\n';
        code += '    font-family: "Segoe UI", Arial, sans-serif;\n';
        code += '    line-height: 1.6;\n';
        code += '    color: #333;\n';
        code += '    background-color: #f4f4f4;\n';
        code += '    padding: 20px;\n';
        code += '}\n\n';
        
        code += '.container {\n';
        code += '    max-width: 1200px;\n';
        code += '    margin: 0 auto;\n';
        code += '    padding: 20px;\n';
        code += '    background-color: #fff;\n';
        code += '    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n';
        code += '    border-radius: 8px;\n';
        code += '}\n\n';
        
        code += '/* Responsive design */\n';
        code += '@media (max-width: 768px) {\n';
        code += '    .container {\n';
        code += '        padding: 10px;\n';
        code += '    }\n';
        code += '}\n';
      } else {
        code += '// Sample code structure for ' + language + '\n';
        code += '// Implement based on your specific requirements\n';
      }
    }
    
    return code;
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    
    toast({
      title: 'Copied to clipboard',
      description: 'Generated code has been copied to your clipboard',
    });
  };
  
  const downloadCode = () => {
    if (!generatedCode) {
      toast({
        title: 'No code to download',
        description: 'Please generate some code first',
        variant: 'destructive',
      });
      return;
    }
    
    // Determine file extension based on language
    let fileExtension = '.txt';
    switch (language) {
      case 'javascript':
        fileExtension = '.js';
        break;
      case 'typescript':
        fileExtension = '.ts';
        break;
      case 'python':
        fileExtension = '.py';
        break;
      case 'java':
        fileExtension = '.java';
        break;
      case 'csharp':
        fileExtension = '.cs';
        break;
      case 'cpp':
        fileExtension = '.cpp';
        break;
      case 'html':
        fileExtension = '.html';
        break;
      case 'css':
        fileExtension = '.css';
        break;
      case 'sql':
        fileExtension = '.sql';
        break;
      default:
        fileExtension = '.' + language;
    }
    
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-code' + fileExtension;
    document.body.appendChild(a);
    a.click();
    
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast({
      title: 'Code downloaded',
      description: `Your code has been downloaded as generated-code${fileExtension}`,
    });
  };
  
  const useExamplePrompt = (example: string) => {
    setPrompt(example);
    
    toast({
      title: 'Example prompt inserted',
      description: 'You can modify it or generate code directly',
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
            <Code className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Code Generator</h1>
          <p className="text-muted-foreground mt-2">Generate code in multiple programming languages</p>
        </div>
        
        <Tabs defaultValue="generate">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-6">
            <TabsTrigger value="generate">1. Generate</TabsTrigger>
            <TabsTrigger value="result" disabled={!generatedCode && !loading}>2. Result</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate">
            <Card>
              <CardHeader>
                <CardTitle>Generate Code</CardTitle>
                <CardDescription>
                  Describe what code you need, and we'll generate it for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Describe what code you need</Label>
                  <Textarea
                    id="prompt"
                    placeholder="E.g., Create a function that calculates the Fibonacci sequence"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[100px]"
                  />
                  
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground mb-2">Example prompts:</p>
                    <div className="flex flex-wrap gap-2">
                      {examplePrompts.map((example, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => useExamplePrompt(example)}
                          className="text-xs"
                        >
                          {example.length > 30 ? example.substring(0, 30) + '...' : example}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="language">Programming Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language">
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
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Options</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="comments"
                          checked={includeComments}
                          onCheckedChange={(checked) => setIncludeComments(checked as boolean)}
                        />
                        <Label htmlFor="comments" className="text-sm">
                          Include comments
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="tests"
                          checked={includeTests}
                          onCheckedChange={(checked) => setIncludeTests(checked as boolean)}
                        />
                        <Label htmlFor="tests" className="text-sm">
                          Include example/test code
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button
                  onClick={generateCode}
                  disabled={loading || !prompt.trim()}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating Code...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Code
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="result">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Generated Code</CardTitle>
                    <CardDescription>
                      {languages.find(lang => lang.value === language)?.label || language} code based on your prompt
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      disabled={!generatedCode || loading}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadCode}
                      disabled={!generatedCode || loading}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="flex flex-col items-center">
                      <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
                      <p className="text-muted-foreground">Generating your code...</p>
                    </div>
                  </div>
                ) : generatedCode ? (
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm font-mono whitespace-pre">
                    {generatedCode}
                  </pre>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground">
                      No code generated yet. Go to the Generate tab to create some code.
                    </p>
                  </div>
                )}
              </CardContent>
              <div className="px-6 py-4 bg-muted/50 text-xs text-muted-foreground">
                <p>Note: For full functionality, this would integrate with an AI API like OpenAI's GPT models, which requires an API key.</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CodeGenerator;
