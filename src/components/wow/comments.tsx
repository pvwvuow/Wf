"use client";

import * as React from "react";
import { Loader2, MessageSquare, Send, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { faDate, faNum } from "./shared";

export interface CommentItem {
  id: number;
  author: string;
  body: string;
  rating: number;
  createdAt: string;
}

export function Stars({ value, size = 12 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" dir="ltr">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < value ? "fill-gold text-gold" : "text-border"}
        />
      ))}
    </span>
  );
}

export function CommentsSection({
  entityType,
  entityId,
}: {
  entityType: string;
  entityId: number;
}) {
  const { toast } = useToast();
  const [comments, setComments] = React.useState<CommentItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [author, setAuthor] = React.useState("");
  const [body, setBody] = React.useState("");
  const [rating, setRating] = React.useState(5);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/comments?type=${entityType}&id=${entityId}`);
      const json = await res.json();
      setComments(json.comments ?? []);
    } catch {
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [entityType, entityId]);

  React.useEffect(() => {
    load();
  }, [load]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (body.trim().length < 3) {
      toast({ title: "خطا", description: "متن نظر باید حداقل ۳ نویسه باشد", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: entityType, id: entityId, author, body, rating }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "خطا در ثبت نظر");
      toast({ title: "ثبت شد", description: "نظر شما با موفقیت ثبت شد" });
      setBody("");
      load();
    } catch (err) {
      toast({
        title: "خطا",
        description: err instanceof Error ? err.message : "خطای نامشخص",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-8" aria-label="نظرات">
      <h3 className="flex items-center gap-2 text-base font-bold text-gold mb-4">
        <MessageSquare size={18} />
        نظرات ({faNum(comments.length)})
      </h3>

      <form
        onSubmit={submit}
        className="rounded-lg border border-border bg-panel-2 p-4 mb-6 space-y-3"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="نام شما (اختیاری)"
            className="sm:w-56 bg-panel border-border"
            maxLength={50}
          />
          <div className="flex items-center gap-2" dir="ltr">
            <span className="text-xs text-muted-foreground">امتیاز:</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`امتیاز ${i + 1}`}
                onClick={() => setRating(i + 1)}
                className="p-0.5"
              >
                <Star
                  size={18}
                  className={
                    i < rating
                      ? "fill-gold text-gold cursor-pointer"
                      : "text-border cursor-pointer hover:text-gold/60"
                  }
                />
              </button>
            ))}
          </div>
        </div>
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="نظر خود درباره این صفحه بنویسید..."
          className="bg-panel border-border min-h-20"
          maxLength={2000}
        />
        <div className="flex justify-start">
          <Button type="submit" disabled={submitting} className="gap-2">
            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            ارسال نظر
          </Button>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="animate-spin text-gold" size={24} />
        </div>
      ) : comments.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">
          هنوز نظری ثبت نشده است؛ اولین نفر باشید!
        </p>
      ) : (
        <ul className="space-y-3">
          {comments.map((c) => (
            <li key={c.id} className="rounded-lg border border-border bg-panel p-4">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-foreground">{c.author}</span>
                  <Stars value={c.rating} />
                </div>
                <span className="text-xs text-muted-foreground">{faDate(c.createdAt)}</span>
              </div>
              <p className="text-sm leading-7 text-foreground/90 whitespace-pre-line">{c.body}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
