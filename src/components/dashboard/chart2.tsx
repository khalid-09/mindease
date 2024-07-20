'use client';

import { TrendingUp } from 'lucide-react';
import { PolarGrid, RadialBar, RadialBarChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { category: 'stress', value: 275, fill: 'var(--color-stress)' },
  { category: 'anxiety', value: 200, fill: 'var(--color-anxiety)' },
  { category: 'depression', value: 187, fill: 'var(--color-depression)' },
  { category: 'fatigue', value: 173, fill: 'var(--color-fatigue)' },
  { category: 'other', value: 90, fill: 'var(--color-other)' },
];

const chartConfig = {
  value: {
    label: 'Value',
  },
  stress: {
    label: 'Stress',
    color: 'hsl(var(--chart-1))',
  },
  anxiety: {
    label: 'Anxiety',
    color: 'hsl(var(--chart-2))',
  },
  depression: {
    label: 'Depression',
    color: 'hsl(var(--chart-3))',
  },
  fatigue: {
    label: 'Fatigue',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function Chart2() {
  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart - Mental Health</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart data={chartData} innerRadius={30} outerRadius={100}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="category" />}
            />
            <PolarGrid gridType="circle" />
            <RadialBar dataKey="value" />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total values for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
