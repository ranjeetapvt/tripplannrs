"use client"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

interface TravelersFormProps {
  formData: any
  updateFormData: (data: any) => void
}

export function TravelersForm({ formData, updateFormData }: TravelersFormProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Step 2 of 6: Who's Traveling</h2>

      <div className="space-y-6">
        <div>
          <Label>Number of Travelers</Label>
          <div className="mt-2 flex items-center space-x-4">
            <Slider
              value={[formData.travelersCount]}
              min={1}
              max={10}
              step={1}
              onValueChange={(value) => updateFormData({ travelersCount: value[0] })}
              className="w-full"
            />
            <span className="w-8 text-center">{formData.travelersCount}</span>
          </div>
        </div>

        <div>
          <Label>Travel Group Type</Label>
          <RadioGroup
            value={formData.travelGroupType}
            onValueChange={(value) => updateFormData({ travelGroupType: value })}
            className="mt-2 grid gap-4 sm:grid-cols-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Solo" id="solo" />
              <Label htmlFor="solo">Solo Traveler</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Couple" id="couple" />
              <Label htmlFor="couple">Couple</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Family" id="family" />
              <Label htmlFor="family">Family with Kids</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Friends" id="friends" />
              <Label htmlFor="friends">Group of Friends</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Business" id="business" />
              <Label htmlFor="business">Business Trip</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  )
}
