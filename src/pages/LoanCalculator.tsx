import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import CalculatorLayout from '@/components/CalculatorLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useCalculatorHistory } from '@/hooks/useCalculatorHistory';
import ToolSEO from '@/components/ToolSEO';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from '@/components/ui/progress';

interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<string>('100000');
  const [interestRate, setInterestRate] = useState<string>('5');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [amortization, setAmortization] = useState<AmortizationEntry[]>([]);
  const { addToHistory } = useCalculatorHistory('loan');

  useEffect(() => {
    if (loanAmount && interestRate && loanTerm) {
      const P = parseFloat(loanAmount);
      const r = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
      const n = parseFloat(loanTerm) * 12; // Number of payments

      if (P > 0 && r > 0 && n > 0) {
        // Calculate monthly payment using amortization formula
        const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        setMonthlyPayment(M);
        
        const total = M * n;
        setTotalPayment(total);
        setTotalInterest(total - P);

        // Generate amortization schedule
        const schedule: AmortizationEntry[] = [];
        let balance = P;

        for (let i = 1; i <= Math.min(n, 360); i++) {
          const interestPayment = balance * r;
          const principalPayment = M - interestPayment;
          balance -= principalPayment;

          schedule.push({
            month: i,
            payment: M,
            principal: principalPayment,
            interest: interestPayment,
            balance: Math.max(0, balance)
          });

          if (balance <= 0) break;
        }

        setAmortization(schedule);

        // Add to history
        addToHistory(
          { loanAmount: P, interestRate: parseFloat(interestRate), loanTerm: parseFloat(loanTerm) },
          { monthlyPayment: M, totalInterest: total - P, totalPayment: total }
        );
      }
    }
  }, [loanAmount, interestRate, loanTerm, addToHistory]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const faqData = [
    {
      question: "How is monthly loan payment calculated?",
      answer: "Monthly payment is calculated using the amortization formula: M = P × [r(1+r)^n] / [(1+r)^n - 1], where P is loan amount, r is monthly interest rate, and n is number of payments."
    },
    {
      question: "What is an amortization schedule?",
      answer: "An amortization schedule shows the breakdown of each loan payment into principal and interest, plus the remaining balance after each payment."
    },
    {
      question: "Should I choose a shorter or longer loan term?",
      answer: "Shorter terms mean higher monthly payments but less total interest paid. Longer terms have lower monthly payments but more total interest. Choose based on your budget and financial goals."
    },
    {
      question: "How does interest rate affect my loan?",
      answer: "Higher interest rates increase both your monthly payment and total interest paid over the life of the loan. Even a 1% difference can significantly impact total cost."
    }
  ];

  return (
    <Layout>
      <ToolSEO
        title="Loan Calculator - Calculate Monthly Payments & Amortization"
        description="Free loan calculator with amortization schedule. Calculate monthly payments, total interest, and see detailed payment breakdown for any loan amount."
        keywords="loan calculator, mortgage calculator, monthly payment calculator, amortization schedule, loan payment, interest calculator"
        toolName="Loan Calculator"
        category="Calculator"
        faqSchema={faqData}
      />
      
      <CalculatorLayout
        title="Loan Calculator"
        description="Calculate monthly payments and view detailed amortization schedule"
        calculatorId="loan"
        calculatorPath="/loan-calculator"
        formula="M = P × [r(1+r)^n] / [(1+r)^n - 1]"
        howToUse={[
          "Enter the total loan amount you need",
          "Input the annual interest rate",
          "Specify the loan term in years",
          "View monthly payment and total cost instantly",
          "Scroll down to see the full amortization schedule"
        ]}
        examples={[
          { title: "Home Mortgage", description: "$300,000 at 4.5% for 30 years = $1,520/month" },
          { title: "Auto Loan", description: "$25,000 at 6% for 5 years = $483/month" },
          { title: "Personal Loan", description: "$10,000 at 8% for 3 years = $313/month" }
        ]}
      >
        <div className="space-y-6">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="loanAmount">Loan Amount ($)</Label>
              <Input
                id="loanAmount"
                type="number"
                placeholder="Enter loan amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                placeholder="Enter interest rate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="loanTerm">Loan Term (years)</Label>
              <Input
                id="loanTerm"
                type="number"
                placeholder="Enter loan term"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
              />
            </div>
          </div>

          {monthlyPayment > 0 && (
            <>
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Monthly Payment</p>
                    <p className="text-2xl font-bold text-primary">{formatCurrency(monthlyPayment)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Interest</p>
                    <p className="text-2xl font-bold">{formatCurrency(totalInterest)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Payment</p>
                    <p className="text-2xl font-bold">{formatCurrency(totalPayment)}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Principal: {formatCurrency(parseFloat(loanAmount))}</span>
                    <span>Interest: {formatCurrency(totalInterest)}</span>
                  </div>
                  <Progress 
                    value={(parseFloat(loanAmount) / totalPayment) * 100} 
                    className="h-3"
                  />
                </div>
              </Card>

              <div>
                <h3 className="text-lg font-semibold mb-4">Amortization Schedule (First 12 Months)</h3>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Principal</TableHead>
                        <TableHead>Interest</TableHead>
                        <TableHead>Balance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {amortization.slice(0, 12).map((entry) => (
                        <TableRow key={entry.month}>
                          <TableCell>{entry.month}</TableCell>
                          <TableCell>{formatCurrency(entry.payment)}</TableCell>
                          <TableCell>{formatCurrency(entry.principal)}</TableCell>
                          <TableCell>{formatCurrency(entry.interest)}</TableCell>
                          <TableCell>{formatCurrency(entry.balance)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </>
          )}
        </div>
      </CalculatorLayout>
    </Layout>
  );
};

export default LoanCalculator;
