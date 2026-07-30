"use server";

import { prisma } from "@grouphub/database";

export interface AnalyticsData {
  overview: {
    totalCommunities: number;
    totalMembers: number;
    totalUsers: number;
  };
  platformStats: { name: string; value: number }[];
  domainStats: { name: string; value: number }[];
  topCommunities: {
    id: string;
    name: string;
    slug: string;
    memberCount: number;
    platform: string;
    logoUrl: string | null;
  }[];
}

export async function getAnalyticsData(): Promise<AnalyticsData> {
  try {
    // 1. Overview
    const totalCommunities = await prisma.community.count();
    const totalUsers = await prisma.user.count();
    
    const communities = await prisma.community.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        memberCount: true,
        platform: true,
        domain: true,
        logoUrl: true,
      }
    });

    const totalMembers = communities.reduce((sum, c) => sum + c.memberCount, 0);

    // 2. Platforms Distribution
    const platformCounts: Record<string, number> = {};
    communities.forEach(c => {
      const p = c.platform || "Khác";
      platformCounts[p] = (platformCounts[p] || 0) + 1;
    });
    const platformStats = Object.keys(platformCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize
      value: platformCounts[key]
    })).sort((a, b) => b.value - a.value);

    // 3. Domain/Category Distribution
    const domainCounts: Record<string, number> = {};
    communities.forEach(c => {
      const d = c.domain || "Khác";
      domainCounts[d] = (domainCounts[d] || 0) + 1;
    });
    const domainStats = Object.keys(domainCounts).map(key => ({
      name: key,
      value: domainCounts[key]
    })).sort((a, b) => b.value - a.value).slice(0, 10); // Top 10 domains

    // 4. Top Communities
    const topCommunities = [...communities]
      .sort((a, b) => b.memberCount - a.memberCount)
      .slice(0, 10)
      .map(c => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        memberCount: c.memberCount,
        platform: c.platform,
        logoUrl: c.logoUrl,
      }));

    return {
      overview: { totalCommunities, totalMembers, totalUsers },
      platformStats,
      domainStats,
      topCommunities
    };
  } catch (error) {
    console.error("Failed to fetch analytics data:", error);
    return {
      overview: { totalCommunities: 0, totalMembers: 0, totalUsers: 0 },
      platformStats: [],
      domainStats: [],
      topCommunities: []
    };
  }
}
