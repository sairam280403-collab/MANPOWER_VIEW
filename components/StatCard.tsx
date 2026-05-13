'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from './ui/Card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'yellow' | 'red';
  delay?: number;
}

export function StatCard({ title, value, icon: Icon, trend, color = 'blue', delay = 0 }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="h-full"
    >
      <Card variant="glass" className="hover:shadow-xl transition-shadow h-full">
        <CardContent className="p-3 sm:p-6 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 sm:mb-2 truncate">
                {title}
              </p>
              <p className="text-base sm:text-2xl font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
                {value}
              </p>
              {trend && (
                <p className={cn(
                  'text-xs sm:text-sm mt-1 sm:mt-2 flex items-center gap-1',
                  trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                )}>
                  <span>{trend.isPositive ? '↑' : '↓'}</span>
                  <span>{Math.abs(trend.value)}%</span>
                </p>
              )}
            </div>
            <div className={cn('p-2 sm:p-3 rounded-lg', colorClasses[color])}>
              <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Made with Bob
