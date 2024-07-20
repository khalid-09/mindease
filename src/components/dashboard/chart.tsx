'use client';

import { TrendingUp } from 'lucide-react';
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';

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

export function Chart() {
  return (
    <Card className="flex w-full flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart - Mental Health</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="value" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData
                            .reduce((acc, cur) => acc + cur.value, 0)
                            .toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Entries
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total entries for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
