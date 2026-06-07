import { Archive, Pen, Star } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { CardTypeBadge } from "./components/CardTypeBadge";
import { TagPill } from "./components/TagPill";
import { Button } from "@/components/ui/button";

// TODO: Add expand button for the content box - the user will be able to scroll or expand/collapse the box back to original size. When expanded the full text will be displayed
export function NoteCard() {
  function handleEdit() {
    console.log("Edit");
  }
  function handleToggleFavorite() {
    console.log("Favorite");
  }
  function handleArchive() {
    console.log("Archive");
  }

  return (
    <Card className="w-120 bg-card group">
      <CardHeader className="-mb-2">
        <CardTitle className="line-clamp-2 text-base">
          A very long title that will definitely make you read the whole thing
          also elephants are aliens and cookies are tastier than bread.
          Indefinitely. I need to learn to code. Alright, lets repeat: A very
          long title that will definitely make you read the whole thing also
          elephants are aliens and cookies are tastier than bread. Indefinitely.
          I need to learn to code. Alright, lets repeat:
        </CardTitle>
        <CardDescription className="line-clamp-2">
          This space will be held for a short description on about what this
          card information is about, however i will make it very looong so i can
          check how it looks like with a loooot of text. Should cars fly? Maybe.
          Only if they are not operated by humans. Who in the 80s or 90 thouyght
          it was a good idea the future to consist of flying cars? Humans make a
          lot of mistakes on 2D surfaces, let alone 3D. It's not a coincidense
          that pilots take many years of practice before they are ready, and we
          want to put Joe out there, flying among thousand other flying
          vehicles?? And what happens when there are jams? How do you pilot in a
          dense space like that? No way.
        </CardDescription>
        <CardAction>
          <CardTypeBadge type="note" />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="h-40 text-gray-200 bg-black/50 p-2 rounded-xl overflow-y-auto">
          useTransition now wraps async functions, not just setState calls. You
          can await data fetching inside a transition — React keeps the UI
          responsive the entire time, and the pending state stays true until the
          async work resolves. The new use() hook The use() hook reads context
          and promises directly inside a component body, eliminating most
          useEffect data-fetch patterns: useTransition now wraps async
          functions, not just setState calls. You can await data fetching inside
          a transition — React keeps the UI responsive the entire time, and the
          pending state stays true until the async work resolves. The new use()
          hook The use() hook reads context and promises directly inside a
          component body, eliminating most useEffect data-fetch patterns:
          useTransition now wraps async functions, not just setState calls. You
          can await data fetching inside a transition — React keeps the UI
          responsive the entire time, and the pending state stays true until the
          async work resolves. The new use() hook The use() hook reads context
          and promises directly inside a component body, eliminating most
          useEffect data-fetch patterns: useTransition now wraps async
          functions, not just setState calls. You can await data fetching inside
          a transition — React keeps the UI responsive the entire time, and the
          pending state stays true until the async work resolves. The new use()
          hook The use() hook reads context and promises directly inside a
          component body, eliminating most useEffect data-fetch patterns:
          useTransition now wraps async functions, not just setState calls. You
          can await data fetching inside a transition — React keeps the UI
          responsive the entire time, and the pending state stays true until the
          async work resolves. The new use() hook The use() hook reads context
          and promises directly inside a component body, eliminating most
          useEffect data-fetch patterns: useTransition now wraps async
          functions, not just setState calls. You can await data fetching inside
          a transition — React keeps the UI responsive the entire time, and the
          pending state stays true until the async work resolves. The new use()
          hook The use() hook reads context and promises directly inside a
          component body, eliminating most useEffect data-fetch patterns:
          useTransition now wraps async functions, not just setState calls. You
          can await data fetching inside a transition — React keeps the UI
          responsive the entire time, and the pending state stays true until the
          async work resolves. The new use() hook The use() hook reads context
          and promises directly inside a component body, eliminating most
          useEffect data-fetch patterns: useTransition now wraps async
          functions, not just setState calls. You can await data fetching inside
          a transition — React keeps the UI responsive the entire time, and the
          pending state stays true until the async work resolves. The new use()
          hook The use() hook reads context and promises directly inside a
          component body, eliminating most useEffect data-fetch patterns:
          useTransition now wraps async functions, not just setState calls. You
          can await data fetching inside a transition — React keeps the UI
          responsive the entire time, and the pending state stays true until the
          async work resolves. The new use() hook The use() hook reads context
          and promises directly inside a component body, eliminating most
          useEffect data-fetch patterns:
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="flex self-end mr-4 mb-2 gap-1 -mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="icon-xs"
            className="hover:text-primary rounded-lg"
            onClick={handleEdit}
          >
            <Pen />
          </Button>
          <Button
            variant="secondary"
            size="icon-xs"
            className="hover:text-primary rounded-lg"
            onClick={handleToggleFavorite}
          >
            <Star />
          </Button>
          <Button
            variant="secondary"
            size="icon-xs"
            className="hover:text-primary rounded-lg"
            onClick={handleArchive}
          >
            <Archive />
          </Button>
        </div>
        <div className="flex gap-2 flex-wrap">
          <TagPill text="React" />
          <TagPill text="React" />
          <TagPill text="TypeScript" />
          <TagPill text="React Hooks" />
          <TagPill text="MHEEEEEP" />
          <TagPill text="How To Code" />
          <TagPill text="Programming" />
          <TagPill text="Tutorial" />
          <TagPill text="How To" />
          <TagPill text="For Later" />
          <TagPill text="Testing" />
        </div>
      </CardFooter>
    </Card>
  );
}
