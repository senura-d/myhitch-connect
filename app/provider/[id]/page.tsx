"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useProvider } from "@/hooks/use-providers";
import { useListingsByProvider } from "@/hooks/use-listings";
import { useReviewsForProvider } from "@/hooks/use-reviews";
import { RatingStars } from "@/components/ui/rating-stars";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileUpload } from "@/components/ui/file-upload";
import {
  IconMapPin,
  IconClock,
  IconShieldCheck,
  IconCheck,
  IconMail,
  IconPlus,
  IconPhoto,
  IconEye,
  IconUpload,
  IconX,
  IconSparkles,
} from "@tabler/icons-react";

const DEFAULT_COVER_IMAGES: Record<string, string> = {
  "cat-home-trade": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80",
  "cat-professional": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
  "cat-personal-care": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=80",
  "cat-events-creative": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80",
  "cat-community": "https://images.unsplash.com/photo-1517457210348-703079e57d4b?auto=format&fit=crop&w=1600&q=80",
};

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category?: string;
}

const INITIAL_SERVICE_GALLERY: Record<string, GalleryImage[]> = {
  "prov-16": [
    {
      id: "g-1",
      url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80",
      title: "Nightwave Concert Turntables Setup",
      category: "DJ & Sound",
    },
    {
      id: "g-2",
      url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80",
      title: "Club Performance & Light Show",
      category: "Lighting & FX",
    },
    {
      id: "g-3",
      url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
      title: "Wedding Reception Live Sound Stage",
      category: "Live Events",
    },
    {
      id: "g-4",
      url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
      title: "Festival Crowd & Laser Production",
      category: "Stage FX",
    },
    {
      id: "g-5",
      url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=80",
      title: "Private Party Acoustic & DJ Console",
      category: "Private Parties",
    },
    {
      id: "g-6",
      url: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1000&q=80",
      title: "Corporate Event Audio Rig",
      category: "Corporate Events",
    },
  ],
};

export default function ProviderProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: provider, isLoading } = useProvider(id);
  const { data: listings } = useListingsByProvider(id);
  const { data: reviews } = useReviewsForProvider(id);

  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(() => {
    return INITIAL_SERVICE_GALLERY[id] || [
      {
        id: "default-1",
        url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80",
        title: "Professional Service Equipment",
        category: "Equipment",
      },
      {
        id: "default-2",
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80",
        title: "Completed Project Showcase",
        category: "Work Showcase",
      },
    ];
  });

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newImageTitle, setNewImageTitle] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [uploadedFilePreview, setUploadedFilePreview] = useState<string | null>(null);
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<GalleryImage | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <div className="h-64 bg-muted animate-pulse rounded-2xl" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Provider Not Found</h1>
          <Button asChild className="mt-4 bg-[#24A1DC] text-white">
            <Link href="/search">Return to Search</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const coverImage =
    provider.coverImageUrl ||
    DEFAULT_COVER_IMAGES[provider.categoryIds[0]] ||
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80";

  const handleAddImageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = uploadedFilePreview || newImageUrl || "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80";
    const newImage: GalleryImage = {
      id: `img-${Date.now()}`,
      url: finalUrl,
      title: newImageTitle.trim() || "New Service Photo",
      category: "Service Work",
    };
    setGalleryImages((prev) => [newImage, ...prev]);
    setNewImageTitle("");
    setNewImageUrl("");
    setUploadedFilePreview(null);
    setIsUploadOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans">
      <Header />

      <main className="flex-1">
        {/* BIG HERO COVER SECTION */}
        <section className="relative bg-white">
          {/* Big Hero Cover Image */}
          <div className="relative h-72 sm:h-96 lg:h-[420px] w-full overflow-hidden bg-zinc-950">
            <img
              src={coverImage}
              alt={`${provider.businessName} cover`}
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />
            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
            
            {/* Quick Badge Overlay on Image */}
            <div className="absolute top-6 left-6 sm:left-12 flex items-center gap-2">
              <Badge className="bg-white/95 backdrop-blur text-[#24A1DC] border border-[#24A1DC]/30 font-bold px-3 py-1 shadow-md text-xs">
                Verified Provider Profile
              </Badge>
              <Badge className="bg-black/60 backdrop-blur text-white border border-white/20 font-semibold px-3 py-1 shadow-md text-xs gap-1">
                <IconPhoto className="h-3.5 w-3.5 text-[#24A1DC]" /> {galleryImages.length} Photos
              </Badge>
            </div>
          </div>

          {/* MINIMALIST PROFILE HEADER */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 -mt-20 sm:-mt-24 relative z-20">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 w-full lg:w-auto">
                {/* Large Logo / Profile Avatar */}
                <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-3xl bg-white border-4 border-white shadow-2xl overflow-hidden flex shrink-0 items-center justify-center relative">
                  {provider.logoUrl ? (
                    <img
                      src={provider.logoUrl}
                      alt={provider.businessName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#24A1DC] text-white font-black text-5xl flex items-center justify-center">
                      {provider.businessName.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="pt-2 space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight">
                      {provider.businessName}
                    </h1>
                    <StatusBadge status={provider.verificationStatus} />
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-500 font-semibold capitalize tracking-wide">
                    {provider.providerType.replace("_", " ")} &bull; Provider ID: {provider.slug}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-zinc-700 pt-1">
                    <div className="flex items-center gap-1.5 bg-[#f0f9ff] text-black px-3 py-1.5 rounded-xl border border-[#24A1DC]/20">
                      <RatingStars value={provider.ratingAverage} size="sm" readOnly />
                      <span className="font-extrabold text-black">
                        {provider.ratingAverage.toFixed(1)}
                      </span>
                      <span className="text-zinc-500 font-normal">({provider.ratingCount} reviews)</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-zinc-50 px-3 py-1.5 rounded-xl border border-zinc-200">
                      <IconMapPin className="h-4 w-4 text-[#24A1DC]" />
                      <span>{provider.locations[0]?.suburb || "Local Coverage"}, {provider.locations[0]?.state}</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-zinc-50 px-3 py-1.5 rounded-xl border border-zinc-200">
                      <IconClock className="h-4 w-4 text-[#24A1DC]" />
                      <span>~{provider.responseTimeHours}h response time</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Minimal Action Buttons */}
              <div className="flex items-center gap-3 w-full lg:w-auto pt-2">
                <Button variant="outline" size="lg" className="flex-1 lg:flex-none font-bold border-zinc-300 text-black hover:border-[#24A1DC] hover:text-[#24A1DC] hover:bg-[#f0f9ff] rounded-xl">
                  <IconMail className="h-4 w-4 mr-2 text-[#24A1DC]" /> Message Provider
                </Button>
                <Button size="lg" className="flex-1 lg:flex-none font-bold bg-[#24A1DC] text-white hover:bg-[#1d8abe] shadow-lg rounded-xl px-8">
                  Request Quote
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CLEAN CONTENT TABS */}
        <section className="py-8 bg-zinc-50/60 border-t border-zinc-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="photos" className="space-y-8">
              <TabsList className="bg-white p-1.5 border border-zinc-200 rounded-2xl inline-flex shadow-sm flex-wrap gap-1">
                <TabsTrigger value="photos" className="rounded-xl font-bold text-xs px-5 py-2.5 data-[state=active]:bg-[#24A1DC] data-[state=active]:text-white">
                  🖼️ Service Photos ({galleryImages.length})
                </TabsTrigger>
                <TabsTrigger value="services" className="rounded-xl font-bold text-xs px-5 py-2.5 data-[state=active]:bg-[#24A1DC] data-[state=active]:text-white">
                  Services ({listings?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="about" className="rounded-xl font-bold text-xs px-5 py-2.5 data-[state=active]:bg-[#24A1DC] data-[state=active]:text-white">
                  About & Credentials
                </TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-xl font-bold text-xs px-5 py-2.5 data-[state=active]:bg-[#24A1DC] data-[state=active]:text-white">
                  Reviews ({reviews?.length || 0})
                </TabsTrigger>
              </TabsList>

              {/* SERVICE PHOTOS GALLERY TAB */}
              <TabsContent value="photos" className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                  <div>
                    <h3 className="text-xl font-extrabold text-black flex items-center gap-2">
                      <IconPhoto className="h-6 w-6 text-[#24A1DC]" /> Service Work Portfolio
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">
                      Browse recent service installations, event setups, and completed project photos.
                    </p>
                  </div>

                  {/* Add Image Upload Dialog Trigger */}
                  <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                    <DialogTrigger asChild>
                      <Button className="font-bold bg-[#24A1DC] text-white hover:bg-[#1d8abe] gap-2 rounded-xl shadow-md">
                        <IconPlus className="h-4 w-4" /> Add Service Image
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-white text-black border border-zinc-200 rounded-2xl p-6">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-extrabold text-black flex items-center gap-2">
                          <IconUpload className="h-5 w-5 text-[#24A1DC]" /> Upload Service Photo
                        </DialogTitle>
                      </DialogHeader>

                      <form onSubmit={handleAddImageSubmit} className="space-y-5 pt-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-black block">Photo Title / Caption</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g., Live Sound Setup for Event"
                            value={newImageTitle}
                            onChange={(e) => setNewImageTitle(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm focus:outline-none focus:border-[#24A1DC] text-black font-medium"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-black block">Upload Image File</label>
                          <FileUpload
                            accept="image/*"
                            multiple={false}
                            label="Click or drop service photo here"
                            hint="Supports PNG, JPG, WEBP up to 10MB"
                            onFilesChange={(files) => {
                              if (files.length > 0 && files[0].file) {
                                const url = URL.createObjectURL(files[0].file);
                                setUploadedFilePreview(url);
                              }
                            }}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-black block">Or Paste Image URL</label>
                          <input
                            type="url"
                            placeholder="https://images.unsplash.com/photo-..."
                            value={newImageUrl}
                            onChange={(e) => {
                              setNewImageUrl(e.target.value);
                              setUploadedFilePreview(null);
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm focus:outline-none focus:border-[#24A1DC] text-black font-medium"
                          />
                        </div>

                        {(uploadedFilePreview || newImageUrl) && (
                          <div className="relative h-40 w-full rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
                            <img
                              src={uploadedFilePreview || newImageUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-[#24A1DC] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                              Preview
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-end gap-3 pt-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsUploadOpen(false)}
                            className="border-zinc-300 font-semibold"
                          >
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-[#24A1DC] text-white hover:bg-[#1d8abe] font-bold">
                            Save to Gallery
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Service Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {galleryImages.map((img) => (
                    <div
                      key={img.id}
                      onClick={() => setSelectedLightboxImage(img)}
                      className="group relative h-64 rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-900 cursor-pointer shadow-sm hover:shadow-xl transition-all hover:border-[#24A1DC]"
                    >
                      <img
                        src={img.url}
                        alt={img.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                      
                      <div className="absolute top-3 right-3">
                        <span className="p-2 rounded-xl bg-white/90 text-black shadow-md group-hover:bg-[#24A1DC] group-hover:text-white transition-colors block">
                          <IconEye className="h-4 w-4" />
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        {img.category && (
                          <Badge className="bg-[#2b89ff] text-white border-none font-bold text-[10px] mb-1">
                            {img.category}
                          </Badge>
                        )}
                        <h4 className="font-extrabold text-sm text-white line-clamp-1 group-hover:text-[#2b89ff] transition-colors">
                          {img.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Lightbox Dialog */}
                {selectedLightboxImage && (
                  <Dialog open={!!selectedLightboxImage} onOpenChange={() => setSelectedLightboxImage(null)}>
                    <DialogContent className="max-w-3xl bg-black text-white border-none p-4 rounded-3xl overflow-hidden">
                      <div className="relative w-full max-h-[75vh] flex items-center justify-center bg-black">
                        <img
                          src={selectedLightboxImage.url}
                          alt={selectedLightboxImage.title}
                          className="max-h-[70vh] w-auto object-contain rounded-2xl"
                        />
                      </div>
                      <div className="p-4 bg-zinc-950 rounded-2xl flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-base text-white">{selectedLightboxImage.title}</h3>
                          <p className="text-xs text-zinc-400">Verified Provider Work Demonstration</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedLightboxImage(null)}
                          className="text-white hover:bg-zinc-800"
                        >
                          <IconX className="h-6 w-6" />
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </TabsContent>

              {/* SERVICES LIST TAB */}
              <TabsContent value="services" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings?.map((listing) => (
                    <Card key={listing.id} className="rounded-2xl border border-zinc-200 bg-white hover:border-[#2b89ff] hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden">
                      <CardHeader className="p-6 pb-4">
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <CardTitle className="text-lg font-extrabold text-black line-clamp-1">{listing.title}</CardTitle>
                          <Badge variant="secondary" className="capitalize text-[11px] bg-[#f0f9ff] text-[#2b89ff] border border-[#2b89ff]/30 font-bold shrink-0">
                            {listing.pricing.method.replace("_", " ")}
                          </Badge>
                        </div>
                        <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed">
                          {listing.description}
                        </p>
                      </CardHeader>
                      <CardContent className="p-6 pt-4 border-t border-zinc-100 bg-[#f8fafc] flex items-center justify-between">
                        <div>
                          <span className="text-[11px] text-zinc-500 uppercase font-semibold block">Starting Price</span>
                          <span className="text-xl font-black text-[#2b89ff]">
                            ${listing.pricing.amount || "Quote"}
                          </span>
                        </div>
                        <Button asChild size="sm" className="font-bold bg-[#2b89ff] text-white hover:bg-[#1d8abe] rounded-xl px-5">
                          <Link href={`/provider/${provider.id}/service/${listing.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* ABOUT & CREDENTIALS TAB */}
              <TabsContent value="about" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <Card className="lg:col-span-2 rounded-2xl border border-zinc-200 bg-white p-8 space-y-6">
                    <div>
                      <h3 className="text-xl font-extrabold text-black mb-3">About {provider.businessName}</h3>
                      <p className="text-sm text-zinc-600 leading-relaxed">{provider.description}</p>
                    </div>

                    <div className="border-t border-zinc-100 pt-6 space-y-4">
                      <h4 className="font-extrabold text-base text-black flex items-center gap-2">
                        <IconShieldCheck className="h-5 w-5 text-[#2b89ff]" /> Verified Credentials & Protection
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 bg-[#f0f9ff] text-black border border-[#2b89ff]/30 px-4 py-2 rounded-xl text-xs font-bold">
                          <IconCheck className="h-4 w-4 text-[#2b89ff]" /> Trade License Verified
                        </div>
                        <div className="flex items-center gap-2 bg-[#f0f9ff] text-black border border-[#2b89ff]/30 px-4 py-2 rounded-xl text-xs font-bold">
                          <IconShieldCheck className="h-4 w-4 text-[#2b89ff]" /> $10M Public Liability Active
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-4">
                    <h4 className="font-bold text-base text-black border-b border-zinc-100 pb-3">Service Parameters</h4>
                    <div className="space-y-3 text-xs">
                      <div className="flex justify-between text-zinc-600">
                        <span>Coverage Radius</span>
                        <span className="font-bold text-black">{provider.serviceRadiusKm} km</span>
                      </div>
                      <div className="flex justify-between text-zinc-600">
                        <span>Languages</span>
                        <span className="font-bold text-black">{provider.languages.join(", ")}</span>
                      </div>
                      <div className="flex justify-between text-zinc-600">
                        <span>Average Response</span>
                        <span className="font-bold text-black">~{provider.responseTimeHours} hours</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              {/* REVIEWS TAB */}
              <TabsContent value="reviews" className="space-y-4">
                {reviews?.length === 0 ? (
                  <Card className="p-8 text-center text-zinc-500 text-sm rounded-2xl border border-zinc-200 bg-white">
                    No customer reviews posted yet for this provider.
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reviews?.map((review) => (
                      <Card key={review.id} className="p-6 space-y-3 rounded-2xl border border-zinc-200 bg-white">
                        <div className="flex justify-between items-center">
                          <span className="font-extrabold text-sm text-black">{review.customerName}</span>
                          <RatingStars value={review.overallRating} size="sm" readOnly />
                        </div>
                        <p className="text-xs text-zinc-600 leading-relaxed">{review.body}</p>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
