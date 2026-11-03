import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'all';

    let data: any = {};

    if (type === 'all' || type === 'settings') {
      data.settings = await prisma.websiteSetting.findMany();
    }
    if (type === 'all' || type === 'faqs') {
      data.faqs = await prisma.faq.findMany({ orderBy: { sortOrder: 'asc' } });
    }
    if (type === 'all' || type === 'testimonials') {
      data.testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } });
    }
    if (type === 'all' || type === 'gallery') {
      data.gallery = await prisma.galleryItem.findMany({ orderBy: { sortOrder: 'asc' } });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching CMS data:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const { type, payload } = body;

    if (type === 'faq') {
      const newFaq = await prisma.faq.create({
        data: {
          question: payload.question,
          answer: payload.answer,
          category: payload.category || 'General',
          isPublished: true,
        },
      });
      return NextResponse.json(newFaq);
    }

    if (type === 'testimonial') {
      const newTestimonial = await prisma.testimonial.create({
        data: {
          patientName: payload.patientName,
          treatment: payload.treatment,
          doctorName: payload.doctorName,
          rating: Number(payload.rating) || 5,
          comment: payload.comment,
          location: payload.location || 'Lucknow, UP',
          isApproved: true,
          isVerified: true,
        },
      });
      return NextResponse.json(newTestimonial);
    }

    if (type === 'gallery') {
      const newGallery = await prisma.galleryItem.create({
        data: {
          title: payload.title,
          category: payload.category || 'Infrastructure',
          imageUrl: payload.imageUrl,
          caption: payload.caption,
        },
      });
      return NextResponse.json(newGallery);
    }

    if (type === 'setting') {
      const updatedSetting = await prisma.websiteSetting.upsert({
        where: { key: payload.key },
        update: { value: payload.value },
        create: {
          key: payload.key,
          value: payload.value,
          category: payload.category || 'general',
        },
      });
      return NextResponse.json(updatedSetting);
    }

    return NextResponse.json({ error: 'Invalid CMS type' }, { status: 400 });
  } catch (error: any) {
    console.error('Error creating CMS item:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
