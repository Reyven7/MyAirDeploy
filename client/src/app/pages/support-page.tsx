import SupportForm from "@/components/forms/support-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Mail, Phone } from "lucide-react";

const SupportPage = () => {
  const faqs = [
    {
      question: "How do I cancel my booking?",
      answer:
        "You can cancel your booking by logging into your account and navigating to 'My Bookings'. Click on the booking you want to cancel and follow the cancellation process. Please note that cancellation fees may apply depending on the airline's policy.",
    },
    {
      question: "When will I receive my refund?",
      answer:
        "Refund processing times vary by airline and payment method. Typically, refunds are processed within 7-14 business days for credit cards and up to 20 business days for other payment methods. You'll receive an email confirmation once the refund has been processed.",
    },
    {
      question: "Can I change my flight dates?",
      answer:
        "Flight date changes depend on the fare type you purchased and the airline's policy. Most airlines allow changes for a fee. You can check if your booking is eligible for changes in your account under 'My Bookings' or contact the airline directly.",
    },
    {
      question: "What is your baggage policy?",
      answer:
        "Baggage policies vary by airline. When you book through Skyscanner, you'll see the baggage allowance included with your fare. Additional baggage can usually be purchased during booking or directly with the airline.",
    },
    {
      question: "How do I check in for my flight?",
      answer:
        "Online check-in is typically available 24-48 hours before departure, depending on the airline. You can check in directly on the airline's website or mobile app using your booking reference. Some airlines also offer check-in through Skyscanner.",
    },
  ];

  const contactOptions = [
    {
      type: "Email Support",
      icon: <Mail className="w-6 h-6" />,
      description: "Send us a detailed message",
      availability: "Response within 24 hours",
      action: "Send Email",
      primary: false,
    },
    {
      type: "Phone Support",
      icon: <Phone className="w-6 h-6" />,
      description: "Speak directly with our team",
      availability: "Mon-Fri, 9AM-6PM",
      action: "Call Now",
      primary: false,
    },
  ];

  return (
    <div className="container max-w-7xl mx-auto px-4">
      {/* Header */}
      <section className="py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          How can we help you?
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Find answers to your questions or get in touch with our support team
        </p>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>

      {/* Support Form + Get in Touch */}
      <section className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8 mb-16">
        {/* Support Form */}
        <SupportForm />

        {/* Get in Touch */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>
              Choose how you'd like to contact us
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contactOptions.map((option, index) => (
              <div
                key={index}
                className={`border rounded-lg p-4 ${
                  option.primary
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`${
                      option.primary ? "text-blue-600" : "text-gray-600"
                    }`}
                  >
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{option.type}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {option.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                      <Clock className="w-3 h-3" />
                      {option.availability}
                    </div>
                    <Button
                      size="sm"
                      variant={option.primary ? "default" : "outline"}
                      className="w-full"
                    >
                      {option.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default SupportPage;
