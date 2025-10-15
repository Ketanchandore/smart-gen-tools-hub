import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCalculatorHistory } from '@/hooks/useCalculatorHistory';
import ToolSEO from '@/components/ToolSEO';

const PercentageCalculator = () => {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [percentage, setPercentage] = useState<string>('');
  const [results, setResults] = useState<Record<string, number>>({});
  const { addToHistory } = useCalculatorHistory('percentage');

  // Calculate X is what % of Y
  useEffect(() => {
    if (value1 && value2) {
      const v1 = parseFloat(value1);
      const v2 = parseFloat(value2);
      if (!isNaN(v1) && !isNaN(v2) && v2 !== 0) {
        const result = (v1 / v2) * 100;
        setResults(prev => ({ ...prev, whatPercent: result }));
      }
    }
  }, [value1, value2]);

  // Calculate X% of Y
  useEffect(() => {
    if (percentage && value2) {
      const p = parseFloat(percentage);
      const v = parseFloat(value2);
      if (!isNaN(p) && !isNaN(v)) {
        const result = (p / 100) * v;
        setResults(prev => ({ ...prev, percentOf: result }));
      }
    }
  }, [percentage, value2]);

  // Calculate percentage increase/decrease
  const calculateChange = (original: number, newValue: number) => {
    if (original === 0) return 0;
    return ((newValue - original) / original) * 100;
  };

  const faqData = [
    {
      question: "How do I calculate what percentage one number is of another?",
      answer: "Divide the first number by the second number, then multiply by 100. For example, to find what percentage 25 is of 100: (25 ÷ 100) × 100 = 25%"
    },
    {
      question: "How do I calculate X% of a number?",
      answer: "Multiply the number by the percentage divided by 100. For example, to find 20% of 150: 150 × (20 ÷ 100) = 30"
    },
    {
      question: "How do I calculate percentage increase?",
      answer: "Subtract the original value from the new value, divide by the original value, and multiply by 100. Formula: ((New - Original) ÷ Original) × 100"
    },
    {
      question: "What's the difference between percentage and percentile?",
      answer: "Percentage is a fraction of 100, while percentile indicates the relative position of a value in a dataset. The 90th percentile means 90% of values fall below that point."
    }
  ];

  return (
    <Layout>
      <ToolSEO
        title="Free Percentage Calculator - Calculate Percentages Instantly"
        description="Calculate percentages, percentage increase/decrease, and find what percentage one number is of another. Free online percentage calculator with step-by-step results."
        keywords="percentage calculator, percent calculator, calculate percentage, percentage increase, percentage decrease, what percentage calculator"
        toolName="Percentage Calculator"
        category="Calculator"
        faqSchema={faqData}
      />
      
      <CalculatorLayout
        title="Percentage Calculator"
        description="Calculate percentages, increases, decreases, and more with instant results"
        calculatorId="percentage"
        calculatorPath="/percentage-calculator"
        formula="Percentage = (Value ÷ Total) × 100"
        howToUse={[
          "Choose the type of calculation you need from the tabs",
          "Enter your values in the input fields",
          "Results are calculated automatically as you type",
          "View detailed breakdowns and explanations",
          "Save or share your calculations"
        ]}
        examples={[
          { title: "Sales Discount", description: "Find 25% off a $80 item = $60" },
          { title: "Grade Score", description: "You got 45 out of 50 = 90%" },
          { title: "Price Increase", description: "Product went from $100 to $120 = 20% increase" }
        ]}
      >
        <Tabs defaultValue="whatpercent" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="whatpercent">What %</TabsTrigger>
            <TabsTrigger value="percentof">X% of Y</TabsTrigger>
            <TabsTrigger value="increase">Increase</TabsTrigger>
            <TabsTrigger value="decrease">Decrease</TabsTrigger>
          </TabsList>

          <TabsContent value="whatpercent" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">What percentage is X of Y?</h3>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="value1">Value (X)</Label>
                  <Input
                    id="value1"
                    type="number"
                    placeholder="Enter first value"
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="value2">Total (Y)</Label>
                  <Input
                    id="value2"
                    type="number"
                    placeholder="Enter total value"
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {results.whatPercent !== undefined && (
              <Card className="p-4 bg-primary/5 border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">Result:</p>
                <p className="text-3xl font-bold text-primary">
                  {results.whatPercent.toFixed(2)}%
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {value1} is {results.whatPercent.toFixed(2)}% of {value2}
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="percentof" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Calculate X% of Y</h3>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="percentage">Percentage (%)</Label>
                  <Input
                    id="percentage"
                    type="number"
                    placeholder="Enter percentage"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="ofValue">Of Value</Label>
                  <Input
                    id="ofValue"
                    type="number"
                    placeholder="Enter value"
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {results.percentOf !== undefined && (
              <Card className="p-4 bg-primary/5 border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">Result:</p>
                <p className="text-3xl font-bold text-primary">
                  {results.percentOf.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {percentage}% of {value2} = {results.percentOf.toFixed(2)}
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="increase" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Calculate Percentage Increase</h3>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="original">Original Value</Label>
                  <Input
                    id="original"
                    type="number"
                    placeholder="Enter original value"
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="new">New Value</Label>
                  <Input
                    id="new"
                    type="number"
                    placeholder="Enter new value"
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {value1 && value2 && (
              <Card className="p-4 bg-primary/5 border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">Percentage Increase:</p>
                <p className="text-3xl font-bold text-primary">
                  {calculateChange(parseFloat(value1), parseFloat(value2)).toFixed(2)}%
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Increase from {value1} to {value2}
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="decrease" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Calculate Percentage Decrease</h3>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="original2">Original Value</Label>
                  <Input
                    id="original2"
                    type="number"
                    placeholder="Enter original value"
                    value={value1}
                    onChange={(e) => setValue1(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="new2">New Value</Label>
                  <Input
                    id="new2"
                    type="number"
                    placeholder="Enter new value"
                    value={value2}
                    onChange={(e) => setValue2(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {value1 && value2 && (
              <Card className="p-4 bg-primary/5 border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">Percentage Decrease:</p>
                <p className="text-3xl font-bold text-primary">
                  {Math.abs(calculateChange(parseFloat(value1), parseFloat(value2))).toFixed(2)}%
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Decrease from {value1} to {value2}
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </CalculatorLayout>
    </Layout>
  );
};

export default PercentageCalculator;
