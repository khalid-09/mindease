'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const chartData = [
  { date: '2024-04-01', happiness: 65, anxiety: 35 },
  { date: '2024-04-02', happiness: 70, anxiety: 40 },
  { date: '2024-04-03', happiness: 60, anxiety: 50 },
  { date: '2024-04-04', happiness: 75, anxiety: 30 },
  { date: '2024-04-05', happiness: 80, anxiety: 25 },
  { date: '2024-04-06', happiness: 85, anxiety: 20 },
  { date: '2024-04-07', happiness: 60, anxiety: 40 },
  { date: '2024-04-08', happiness: 90, anxiety: 15 },
  { date: '2024-04-09', happiness: 50, anxiety: 55 },
  { date: '2024-04-10', happiness: 70, anxiety: 35 },
  { date: '2024-04-11', happiness: 85, anxiety: 20 },
  { date: '2024-04-12', happiness: 65, anxiety: 45 },
  { date: '2024-04-13', happiness: 75, anxiety: 25 },
  { date: '2024-04-14', happiness: 55, anxiety: 50 },
  { date: '2024-04-15', happiness: 50, anxiety: 60 },
  { date: '2024-04-16', happiness: 60, anxiety: 40 },
  { date: '2024-04-17', happiness: 95, anxiety: 10 },
  { date: '2024-04-18', happiness: 80, anxiety: 20 },
  { date: '2024-04-19', happiness: 60, anxiety: 45 },
  { date: '2024-04-20', happiness: 50, anxiety: 50 },
  { date: '2024-04-21', happiness: 55, anxiety: 45 },
  { date: '2024-04-22', happiness: 70, anxiety: 35 },
  { date: '2024-04-23', happiness: 60, anxiety: 40 },
  { date: '2024-04-24', happiness: 85, anxiety: 20 },
  { date: '2024-04-25', happiness: 75, anxiety: 30 },
  { date: '2024-04-26', happiness: 50, anxiety: 55 },
  { date: '2024-04-27', happiness: 90, anxiety: 15 },
  { date: '2024-04-28', happiness: 55, anxiety: 45 },
  { date: '2024-04-29', happiness: 75, anxiety: 25 },
  { date: '2024-04-30', happiness: 95, anxiety: 10 },
  { date: '2024-05-01', happiness: 70, anxiety: 30 },
  { date: '2024-05-02', happiness: 80, anxiety: 25 },
  { date: '2024-05-03', happiness: 60, anxiety: 40 },
  { date: '2024-05-04', happiness: 90, anxiety: 15 },
  { date: '2024-05-05', happiness: 95, anxiety: 10 },
  { date: '2024-05-06', happiness: 95, anxiety: 5 },
  { date: '2024-05-07', happiness: 80, anxiety: 25 },
  { date: '2024-05-08', happiness: 55, anxiety: 45 },
  { date: '2024-05-09', happiness: 70, anxiety: 35 },
  { date: '2024-05-10', happiness: 85, anxiety: 20 },
  { date: '2024-05-11', happiness: 75, anxiety: 25 },
  { date: '2024-05-12', happiness: 65, anxiety: 40 },
  { date: '2024-05-13', happiness: 50, anxiety: 55 },
  { date: '2024-05-14', happiness: 90, anxiety: 10 },
  { date: '2024-05-15', happiness: 95, anxiety: 15 },
  { date: '2024-05-16', happiness: 80, anxiety: 25 },
  { date: '2024-05-17', happiness: 95, anxiety: 10 },
  { date: '2024-05-18', happiness: 75, anxiety: 25 },
  { date: '2024-05-19', happiness: 60, anxiety: 40 },
  { date: '2024-05-20', happiness: 65, anxiety: 35 },
  { date: '2024-05-21', happiness: 50, anxiety: 55 },
  { date: '2024-05-22', happiness: 45, anxiety: 60 },
  { date: '2024-05-23', happiness: 70, anxiety: 30 },
  { date: '2024-05-24', happiness: 75, anxiety: 25 },
  { date: '2024-05-25', happiness: 65, anxiety: 35 },
  { date: '2024-05-26', happiness: 55, anxiety: 45 },
  { date: '2024-05-27', happiness: 90, anxiety: 10 },
  { date: '2024-05-28', happiness: 65, anxiety: 40 },
  { date: '2024-05-29', happiness: 50, anxiety: 55 },
  { date: '2024-05-30', happiness: 75, anxiety: 25 },
  { date: '2024-05-31', happiness: 60, anxiety: 40 },
  { date: '2024-06-01', happiness: 60, anxiety: 35 },
  { date: '2024-06-02', happiness: 90, anxiety: 15 },
  { date: '2024-06-03', happiness: 55, anxiety: 50 },
  { date: '2024-06-04', happiness: 85, anxiety: 20 },
  { date: '2024-06-05', happiness: 50, anxiety: 55 },
  { date: '2024-06-06', happiness: 75, anxiety: 25 },
  { date: '2024-06-07', happiness: 80, anxiety: 20 },
  { date: '2024-06-08', happiness: 85, anxiety: 15 },
  { date: '2024-06-09', happiness: 95, anxiety: 10 },
  { date: '2024-06-10', happiness: 60, anxiety: 35 },
  { date: '2024-06-11', happiness: 50, anxiety: 50 },
  { date: '2024-06-12', happiness: 90, anxiety: 15 },
  { date: '2024-06-13', happiness: 45, anxiety: 60 },
  { date: '2024-06-14', happiness: 85, anxiety: 20 },
  { date: '2024-06-15', happiness: 75, anxiety: 25 },
  { date: '2024-06-16', happiness: 70, anxiety: 30 },
  { date: '2024-06-17', happiness: 95, anxiety: 5 },
  { date: '2024-06-18', happiness: 55, anxiety: 45 },
  { date: '2024-06-19', happiness: 70, anxiety: 30 },
  { date: '2024-06-20', happiness: 90, anxiety: 15 },
  { date: '2024-06-21', happiness: 60, anxiety: 35 },
  { date: '2024-06-22', happiness: 75, anxiety: 25 },
  { date: '2024-06-23', happiness: 95, anxiety: 5 },
  { date: '2024-06-24', happiness: 50, anxiety: 50 },
  { date: '2024-06-25', happiness: 55, anxiety: 45 },
  { date: '2024-06-26', happiness: 85, anxiety: 20 },
  { date: '2024-06-27', happiness: 90, anxiety: 15 },
  { date: '2024-06-28', happiness: 55, anxiety: 50 },
  { date: '2024-06-29', happiness: 50, anxiety: 55 },
  { date: '2024-06-30', happiness: 95, anxiety: 10 },
];

const chartConfig = {
  happiness: {
    label: 'Happiness',
    color: 'hsl(var(--chart-1))',
  },
  anxiety: {
    label: 'Anxiety',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function MoodChart() {
  const [timeRange, setTimeRange] = React.useState('90d');

  const filteredData = chartData.filter(item => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Your Mood Trend 👀</CardTitle>
          <CardDescription>
            Showing mood metrics for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillHappiness" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-happiness)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-happiness)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillAnxiety" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-anxiety)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-anxiety)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={value => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={value => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="happiness"
              type="natural"
              fill="url(#fillHappiness)"
              stroke="var(--color-happiness)"
              stackId="a"
            />
            <Area
              dataKey="anxiety"
              type="natural"
              fill="url(#fillAnxiety)"
              stroke="var(--color-anxiety)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
