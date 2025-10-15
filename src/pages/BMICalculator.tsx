import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCalculatorHistory } from '@/hooks/useCalculatorHistory';
import ToolSEO from '@/components/ToolSEO';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const BMICalculator = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('imperial');
  const [bmi, setBmi] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [healthRisk, setHealthRisk] = useState<string>('');
  const [idealWeightRange, setIdealWeightRange] = useState<{ min: number; max: number }>({ min: 0, max: 0 });
  const { addToHistory } = useCalculatorHistory('bmi');

  useEffect(() => {
    if (weight && height) {
      let w = parseFloat(weight);
      let h = parseFloat(height);

      if (unit === 'imperial') {
        // Convert to metric (lbs to kg, inches to cm)
        w = w * 0.453592;
        h = h * 2.54;
      }

      if (w > 0 && h > 0) {
        // BMI = weight(kg) / height(m)^2
        const heightInMeters = h / 100;
        const calculatedBMI = w / (heightInMeters * heightInMeters);
        setBmi(calculatedBMI);

        // Calculate ideal weight range (BMI 18.5-24.9)
        const minWeight = 18.5 * heightInMeters * heightInMeters;
        const maxWeight = 24.9 * heightInMeters * heightInMeters;
        
        if (unit === 'imperial') {
          setIdealWeightRange({
            min: minWeight / 0.453592,
            max: maxWeight / 0.453592
          });
        } else {
          setIdealWeightRange({ min: minWeight, max: maxWeight });
        }

        // Determine category and health risk
        let cat = '';
        let risk = '';
        if (calculatedBMI < 18.5) {
          cat = 'Underweight';
          risk = 'Increased risk of nutritional deficiency and osteoporosis';
        } else if (calculatedBMI >= 18.5 && calculatedBMI < 25) {
          cat = 'Normal weight';
          risk = 'Low risk - maintain healthy lifestyle';
        } else if (calculatedBMI >= 25 && calculatedBMI < 30) {
          cat = 'Overweight';
          risk = 'Increased risk of cardiovascular disease';
        } else if (calculatedBMI >= 30 && calculatedBMI < 35) {
          cat = 'Obese (Class I)';
          risk = 'High risk - consult healthcare provider';
        } else if (calculatedBMI >= 35 && calculatedBMI < 40) {
          cat = 'Obese (Class II)';
          risk = 'Very high risk - medical intervention recommended';
        } else {
          cat = 'Obese (Class III)';
          risk = 'Extremely high risk - immediate medical attention advised';
        }

        setCategory(cat);
        setHealthRisk(risk);

        addToHistory(
          { weight: w, height: h, unit },
          { bmi: calculatedBMI, category: cat }
        );
      }
    }
  }, [weight, height, unit, addToHistory]);

  const getBMIColor = () => {
    if (bmi < 18.5) return 'text-blue-600';
    if (bmi < 25) return 'text-green-600';
    if (bmi < 30) return 'text-yellow-600';
    if (bmi < 35) return 'text-orange-600';
    return 'text-red-600';
  };

  const getBMIProgress = () => {
    // Scale BMI from 15-40 to 0-100
    return Math.min(100, Math.max(0, ((bmi - 15) / 25) * 100));
  };

  const faqData = [
    {
      question: "What is BMI and how is it calculated?",
      answer: "BMI (Body Mass Index) is a measure of body fat based on height and weight. It's calculated as weight in kilograms divided by height in meters squared (kg/m²)."
    },
    {
      question: "Is BMI accurate for everyone?",
      answer: "BMI is a general indicator and may not be accurate for athletes with high muscle mass, pregnant women, elderly, or certain ethnic groups. Consult a healthcare provider for personalized assessment."
    },
    {
      question: "What is a healthy BMI range?",
      answer: "A healthy BMI range is typically 18.5 to 24.9. Below 18.5 is considered underweight, 25-29.9 is overweight, and 30+ is obese."
    },
    {
      question: "Should I lose weight if my BMI is high?",
      answer: "If your BMI indicates overweight or obesity, consult with a healthcare provider about healthy weight loss strategies. They can provide personalized recommendations based on your overall health."
    }
  ];

  return (
    <Layout>
      <ToolSEO
        title="BMI Calculator - Calculate Body Mass Index with Health Recommendations"
        description="Free BMI calculator with detailed health recommendations. Calculate your Body Mass Index, ideal weight range, and get personalized health insights instantly."
        keywords="bmi calculator, body mass index, bmi chart, ideal weight calculator, healthy weight range, obesity calculator"
        toolName="BMI Calculator"
        category="Calculator"
        faqSchema={faqData}
      />
      
      <CalculatorLayout
        title="BMI Calculator"
        description="Calculate your Body Mass Index and get detailed health recommendations"
        calculatorId="bmi"
        calculatorPath="/bmi-calculator"
        formula="BMI = weight(kg) / height(m)²"
        howToUse={[
          "Choose your preferred unit system (metric or imperial)",
          "Enter your weight in pounds or kilograms",
          "Enter your height in inches or centimeters",
          "View your BMI, category, and health recommendations instantly",
          "See your ideal weight range for optimal health"
        ]}
        examples={[
          { title: "Adult Male", description: "180 lbs, 70 inches = BMI 25.8 (Overweight)" },
          { title: "Adult Female", description: "140 lbs, 65 inches = BMI 23.3 (Normal)" },
          { title: "Metric Example", description: "70 kg, 170 cm = BMI 24.2 (Normal)" }
        ]}
      >
        <div className="space-y-6">
          <div>
            <Label className="mb-3 block">Unit System</Label>
            <RadioGroup value={unit} onValueChange={(value) => setUnit(value as 'metric' | 'imperial')}>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="imperial" id="imperial" />
                  <Label htmlFor="imperial">Imperial (lbs, inches)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="metric" id="metric" />
                  <Label htmlFor="metric">Metric (kg, cm)</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="weight">
                Weight ({unit === 'imperial' ? 'pounds' : 'kilograms'})
              </Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                placeholder={unit === 'imperial' ? 'Enter weight in lbs' : 'Enter weight in kg'}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="height">
                Height ({unit === 'imperial' ? 'inches' : 'centimeters'})
              </Label>
              <Input
                id="height"
                type="number"
                step="0.1"
                placeholder={unit === 'imperial' ? 'Enter height in inches' : 'Enter height in cm'}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>

          {bmi > 0 && (
            <>
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Your BMI</p>
                  <p className={`text-5xl font-bold ${getBMIColor()}`}>
                    {bmi.toFixed(1)}
                  </p>
                  <p className="text-lg font-semibold mt-2">{category}</p>
                </div>

                <div className="mb-4">
                  <Progress value={getBMIProgress()} className="h-4" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>15</span>
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40</span>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>{healthRisk}</AlertDescription>
                </Alert>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-3">Ideal Weight Range</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  For your height, a healthy weight range is:
                </p>
                <p className="text-xl font-bold text-primary">
                  {idealWeightRange.min.toFixed(1)} - {idealWeightRange.max.toFixed(1)} {unit === 'imperial' ? 'lbs' : 'kg'}
                </p>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-3">BMI Categories</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Underweight</span>
                    <span className="text-blue-600">&lt; 18.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Normal weight</span>
                    <span className="text-green-600">18.5 - 24.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overweight</span>
                    <span className="text-yellow-600">25 - 29.9</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Obese</span>
                    <span className="text-red-600">≥ 30</span>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </CalculatorLayout>
    </Layout>
  );
};

export default BMICalculator;
