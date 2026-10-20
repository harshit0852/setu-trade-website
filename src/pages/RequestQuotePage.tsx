import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CircleCheck, FileText, Globe as Globe2, Package, Ship, ShieldCheck, Info, User, Building2, Mail, Phone, MapPin, Scale, Calendar, PackageCheck, ClipboardList, MessageSquare, Tag, Layers, Loader2, AlertCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PRODUCT_CATEGORIES } from '@/data/site';
import { useSeo } from '@/hooks/useSeo';
import { submitEnquiry, type EnquiryInput } from '@/lib/enquiries';

const BUYER_TYPES = [
  'Importer',
  'Wholesaler',
  'Distributor',
  'Retailer',
  'Processor',
  'Other',
];

const UNITS = ['KG', 'MT / Ton', 'Carton', 'Bag', 'Container'];

const INCOTERMS = ['EXW', 'FCA', 'FOB', 'CFR', 'CIF', 'DAP', 'Other'];

const PAYMENT_TERMS = ['Advance', 'LC', 'DP', 'DA', 'Open Account', 'Other'];

interface RfqFormState {
  fullName: string;
  company: string;
  country: string;
  city: string;
  email: string;
  phone: string;
  buyerType: string;
  product: string;
  variety: string;
  quantity: string;
  unit: string;
  packaging: string;
  destinationCountry: string;
  destinationCity: string;
  deliveryDate: string;
  specifications: string;
  message: string;
  incoterm: string;
  paymentTerms: string;
}

const EMPTY_FORM: RfqFormState = {
  fullName: '',
  company: '',
  country: '',
  city: '',
  email: '',
  phone: '',
  buyerType: '',
  product: '',
  variety: '',
  quantity: '',
  unit: '',
  packaging: '',
  destinationCountry: '',
  destinationCity: '',
  deliveryDate: '',
  specifications: '',
  message: '',
  incoterm: '',
  paymentTerms: '',
};

const PRODUCT_OPTIONS = PRODUCT_CATEGORIES.map((cat) => ({
  category: cat.name,
  items: cat.items.map((i) => ({ slug: i.routeSlug, name: i.name })),
}));

const REQUIRED_FIELDS: (keyof RfqFormState)[] = [
  'fullName',
  'company',
  'country',
  'email',
  'phone',
  'buyerType',
  'product',
  'quantity',
  'unit',
  'destinationCountry',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: RfqFormState): Partial<Record<keyof RfqFormState, string>> {
  const errors: Partial<Record<keyof RfqFormState, string>> = {};

  for (const field of REQUIRED_FIELDS) {
    if (!String(form[field]).trim()) {
      errors[field] = 'This field is required.';
    }
  }

  if (form.email && !EMAIL_REGEX.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (form.quantity && isNaN(Number(form.quantity))) {
    errors.quantity = 'Quantity must be a number.';
  } else if (form.quantity && Number(form.quantity) <= 0) {
    errors.quantity = 'Quantity must be greater than zero.';
  }

  return errors;
}

export function RequestQuotePage() {
  useSeo({
    title: 'Request a Quote | Setu Trade',
    description:
      'Submit a detailed product enquiry to Setu Trade. Share your product, quantity, specification and destination requirements for a commercial response.',
  });

  const [searchParams] = useSearchParams();
  const productParam = searchParams.get('product') ?? '';

  const [form, setForm] = useState<RfqFormState>(() => {
    if (productParam) {
      return { ...EMPTY_FORM, product: productParam };
    }
    return EMPTY_FORM;
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RfqFormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmationEmailSent, setConfirmationEmailSent] = useState(false);
  const [buyerEmail, setBuyerEmail] = useState('');
  const [touched, setTouched] = useState<Partial<Record<keyof RfqFormState, boolean>>>({});

  const validProductSlugs = useMemo(
    () => new Set(PRODUCT_OPTIONS.flatMap((g) => g.items.map((i) => i.slug))),
    [],
  );

  const prefilledProductName = useMemo(() => {
    if (!form.product || !validProductSlugs.has(form.product)) return null;
    for (const group of PRODUCT_OPTIONS) {
      const found = group.items.find((i) => i.slug === form.product);
      if (found) return found.name;
    }
    return null;
  }, [form.product, validProductSlugs]);

  const update = (field: keyof RfqFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const markTouched = (field: keyof RfqFormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const validationErrors = validate(form);
    setErrors(validationErrors);
    setTouched(Object.fromEntries(REQUIRED_FIELDS.map((f) => [f, true])) as Partial<
      Record<keyof RfqFormState, boolean>
    >);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = REQUIRED_FIELDS.find((f) => validationErrors[f]);
      if (firstErrorField) {
        const el = document.getElementById(`field-${firstErrorField}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (el as HTMLElement | null)?.focus?.();
      }
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const payload: EnquiryInput = {
      full_name: form.fullName.trim(),
      company: form.company.trim(),
      country: form.country.trim(),
      city: form.city.trim() || null,
      email: form.email.trim(),
      phone_whatsapp: form.phone.trim(),
      buyer_type: form.buyerType,
      product: form.product,
      variety_grade: form.variety.trim() || null,
      quantity: form.quantity ? Number(form.quantity) : null,
      unit: form.unit || null,
      packaging: form.packaging.trim() || null,
      destination: form.destinationCountry.trim(),
      delivery_date: form.deliveryDate || null,
      specifications: form.specifications.trim() || null,
      additional_message: form.message.trim() || null,
      incoterm: form.incoterm || null,
      payment_terms: form.paymentTerms || null,
    };

    try {
      const result = await submitEnquiry(payload);
      setConfirmationEmailSent(result.buyerEmailSent);
      setBuyerEmail(result.enquiry.email);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Something went wrong while submitting your enquiry. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setTouched({});
    setSubmitted(false);
    setSubmitError(null);
    setConfirmationEmailSent(false);
    setBuyerEmail('');
  };

  return (
    <>
      <Header />
      <div className="pt-[4.5rem]">
        {submitted ? (
          <SuccessState
            onReset={resetForm}
            product={prefilledProductName}
            confirmationEmailSent={confirmationEmailSent}
            buyerEmail={buyerEmail}
          />
        ) : (
          <>
            <RfqIntro product={prefilledProductName} />
            <RfqForm
              form={form}
              errors={errors}
              touched={touched}
              submitting={submitting}
              submitError={submitError}
              onUpdate={update}
              onTouched={markTouched}
              onSubmit={handleSubmit}
            />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

function RfqIntro({ product }: { product: string | null }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-950">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950" />
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-600 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-brand-800 blur-3xl" />
      </div>
      <div className="container-page py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow text-brand-300 animate-fade-up">
            <span className="h-px w-8 bg-brand-400" />
            Request for Quote
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl animate-fade-up" style={{ animationDelay: '0.08s' }}>
            Submit a Product Enquiry
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-100 animate-fade-up" style={{ animationDelay: '0.16s' }}>
            Share your product, quantity, specification and destination requirements.
            Our team will review your enquiry and respond with availability and
            commercial terms.
          </p>
          {product && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-brand-700 bg-brand-900/50 px-4 py-2.5 text-sm text-brand-100 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Package className="h-4 w-4 text-brand-400" />
              Enquiring about <span className="font-semibold text-white">{product}</span>
            </div>
          )}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 animate-fade-up" style={{ animationDelay: '0.24s' }}>
            <TrustBadge icon={ShieldCheck} text="Buyer-specified requirements" />
            <TrustBadge icon={Globe2} text="International trade" />
            <TrustBadge icon={Ship} text="Export coordination" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBadge({ icon: Icon, text }: { icon: typeof ShieldCheck; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-brand-200">
      <Icon className="h-4 w-4 text-brand-400" strokeWidth={1.9} />
      {text}
    </span>
  );
}

function RfqForm({
  form,
  errors,
  touched,
  submitting,
  submitError,
  onUpdate,
  onTouched,
  onSubmit,
}: {
  form: RfqFormState;
  errors: Partial<Record<keyof RfqFormState, string>>;
  touched: Partial<Record<keyof RfqFormState, boolean>>;
  submitting: boolean;
  submitError: string | null;
  onUpdate: (field: keyof RfqFormState, value: string) => void;
  onTouched: (field: keyof RfqFormState) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} noValidate className="bg-charcoal-50">
      {/* Trust note */}
      <div className="border-b border-charcoal-100 bg-white">
        <div className="container-page py-5">
          <div className="flex items-start gap-3 rounded-xl border border-brand-100 bg-brand-50/60 p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" strokeWidth={1.9} />
            <p className="text-sm leading-relaxed text-charcoal-700">
              Please provide accurate product, quantity, destination and specification
              details so we can prepare a suitable commercial response.
            </p>
          </div>
        </div>
      </div>

      <div className="container-page space-y-8 py-12 sm:py-14">
        {/* Buyer Information */}
        <FormSection
          number="01"
          icon={User}
          title="Buyer Information"
          description="Tell us about you and your company."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              id="fullName"
              label="Full Name"
              required
              icon={User}
              value={form.fullName}
              error={touched.fullName ? errors.fullName : undefined}
              onChange={(v) => update('fullName', v)}
              onTouched={onTouched}
              placeholder="Your full name"
              autoComplete="name"
            />
            <TextField
              id="company"
              label="Company Name"
              required
              icon={Building2}
              value={form.company}
              error={touched.company ? errors.company : undefined}
              onChange={(v) => update('company', v)}
              onTouched={onTouched}
              placeholder="Your company name"
              autoComplete="organization"
            />
            <TextField
              id="country"
              label="Country"
              required
              icon={MapPin}
              value={form.country}
              error={touched.country ? errors.country : undefined}
              onChange={(v) => update('country', v)}
              onTouched={onTouched}
              placeholder="Your country"
              autoComplete="country-name"
            />
            <TextField
              id="city"
              label="City"
              icon={MapPin}
              value={form.city}
              onChange={(v) => update('city', v)}
              onTouched={onTouched}
              placeholder="Your city"
              autoComplete="address-level2"
            />
            <TextField
              id="email"
              label="Business Email"
              required
              type="email"
              icon={Mail}
              value={form.email}
              error={touched.email ? errors.email : undefined}
              onChange={(v) => update('email', v)}
              onTouched={onTouched}
              placeholder="you@company.com"
              autoComplete="email"
            />
            <TextField
              id="phone"
              label="Phone / WhatsApp"
              required
              icon={Phone}
              value={form.phone}
              error={touched.phone ? errors.phone : undefined}
              onChange={(v) => update('phone', v)}
              onTouched={onTouched}
              placeholder="Include country code"
              autoComplete="tel"
            />
            <SelectField
              id="buyerType"
              label="Buyer Type"
              required
              value={form.buyerType}
              error={touched.buyerType ? errors.buyerType : undefined}
              onChange={(v) => update('buyerType', v)}
              onTouched={onTouched}
              options={BUYER_TYPES}
              placeholder="Select buyer type"
            />
          </div>
        </FormSection>

        {/* Product Requirement */}
        <FormSection
          number="02"
          icon={Package}
          title="Product Requirement"
          description="Share the product, quantity and destination you need."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              id="product"
              label="Product"
              required
              value={form.product}
              error={touched.product ? errors.product : undefined}
              onChange={(v) => update('product', v)}
              onTouched={onTouched}
              placeholder="Select a product"
              groupedOptions={PRODUCT_OPTIONS}
            />
            <TextField
              id="variety"
              label="Variety / Grade"
              icon={Layers}
              value={form.variety}
              onChange={(v) => update('variety', v)}
              onTouched={onTouched}
              placeholder="e.g. Basmati, Grade A"
            />
            <TextField
              id="quantity"
              label="Quantity"
              required
              type="number"
              icon={Scale}
              value={form.quantity}
              error={touched.quantity ? errors.quantity : undefined}
              onChange={(v) => update('quantity', v)}
              onTouched={onTouched}
              placeholder="Required quantity"
              min="0"
              step="any"
            />
            <SelectField
              id="unit"
              label="Unit"
              required
              value={form.unit}
              error={touched.unit ? errors.unit : undefined}
              onChange={(v) => update('unit', v)}
              onTouched={onTouched}
              options={UNITS}
              placeholder="Select unit"
            />
            <TextField
              id="packaging"
              label="Packaging Requirement"
              icon={PackageCheck}
              value={form.packaging}
              onChange={(v) => update('packaging', v)}
              onTouched={onTouched}
              placeholder="e.g. 25 kg bags, jute, cartons"
            />
            <TextField
              id="destinationCountry"
              label="Destination Country"
              required
              icon={Globe2}
              value={form.destinationCountry}
              error={touched.destinationCountry ? errors.destinationCountry : undefined}
              onChange={(v) => update('destinationCountry', v)}
              onTouched={onTouched}
              placeholder="Delivery country"
            />
            <TextField
              id="destinationCity"
              label="Destination City / Port"
              icon={MapPin}
              value={form.destinationCity}
              onChange={(v) => update('destinationCity', v)}
              onTouched={onTouched}
              placeholder="City or port of delivery"
            />
            <TextField
              id="deliveryDate"
              label="Required Delivery Date"
              type="date"
              icon={Calendar}
              value={form.deliveryDate}
              onChange={(v) => update('deliveryDate', v)}
              onTouched={onTouched}
            />
            <TextAreaField
              id="specifications"
              label="Product Specifications / Quality Requirements"
              icon={ClipboardList}
              value={form.specifications}
              onChange={(v) => update('specifications', v)}
              onTouched={onTouched}
              placeholder="Size, grade, moisture, quality parameters, certifications, etc."
              className="sm:col-span-2"
            />
            <TextAreaField
              id="message"
              label="Additional Message"
              icon={MessageSquare}
              value={form.message}
              onChange={(v) => update('message', v)}
              onTouched={onTouched}
              placeholder="Any other details relevant to your enquiry."
              className="sm:col-span-2"
            />
          </div>
        </FormSection>

        {/* Commercial Requirements */}
        <FormSection
          number="03"
          icon={Tag}
          title="Commercial Requirements"
          description="Share your preferred trade and payment terms."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              id="incoterm"
              label="Preferred Incoterm"
              value={form.incoterm}
              onChange={(v) => update('incoterm', v)}
              onTouched={onTouched}
              options={INCOTERMS}
              placeholder="Select incoterm"
            />
            <SelectField
              id="paymentTerms"
              label="Preferred Payment Terms"
              value={form.paymentTerms}
              onChange={(v) => update('paymentTerms', v)}
              onTouched={onTouched}
              options={PAYMENT_TERMS}
              placeholder="Select payment terms"
            />
          </div>
        </FormSection>

        {/* Submit error */}
        {submitError && (
          <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" strokeWidth={1.9} />
            <div>
              <p className="text-sm font-semibold text-red-800">Could not submit your enquiry.</p>
              <p className="mt-1 text-sm text-red-700">{submitError}</p>
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:justify-between">
          <p className="text-sm text-charcoal-500">
            Fields marked with <span className="font-semibold text-charcoal-700">*</span> are required.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link to="/products" className={`btn-secondary justify-center ${submitting ? 'pointer-events-none opacity-50' : ''}`}>
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
            <button type="submit" disabled={submitting} className="btn-primary text-base disabled:cursor-not-allowed disabled:opacity-60">
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  Submit Enquiry
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );

  function update(field: keyof RfqFormState, value: string) {
    onUpdate(field, value);
  }
}

function FormSection({
  number,
  icon: Icon,
  title,
  description,
  children,
}: {
  number: string;
  icon: typeof User;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card overflow-hidden">
      <div className="flex items-start gap-4 border-b border-charcoal-100 bg-charcoal-50/50 p-6 sm:p-7">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white">
          <Icon className="h-5 w-5" strokeWidth={1.9} />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
            Step {number}
          </p>
          <h2 className="mt-1 text-xl font-bold text-charcoal-900">{title}</h2>
          <p className="mt-1 text-sm text-charcoal-600">{description}</p>
        </div>
      </div>
      <div className="p-6 sm:p-7">{children}</div>
    </section>
  );
}

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

function FieldShell({ id, label, required, error, children, className = '' }: FieldShellProps) {
  return (
    <div className={className}>
      <label htmlFor={`field-${id}`} className="block text-sm font-semibold text-charcoal-800">
        {label}
        {required && <span className="ml-0.5 text-brand-600">*</span>}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>
      )}
    </div>
  );
}

const baseControlClass =
  'w-full rounded-lg border bg-white py-2.5 text-sm text-charcoal-900 placeholder:text-charcoal-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-100';

function borderClass(error?: string, touched?: boolean) {
  if (error && touched) return 'border-red-400 focus:border-red-500';
  return 'border-charcoal-200 focus:border-brand-400';
}

interface TextFieldProps {
  id: keyof RfqFormState;
  label: string;
  required?: boolean;
  type?: string;
  icon?: typeof User;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onTouched: (field: keyof RfqFormState) => void;
  placeholder?: string;
  autoComplete?: string;
  min?: string;
  step?: string;
  className?: string;
}

function TextField({
  id,
  label,
  required,
  type = 'text',
  icon: Icon,
  value,
  error,
  onChange,
  onTouched,
  placeholder,
  autoComplete,
  min,
  step,
  className,
}: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} className={className}>
      <div className="relative">
        {Icon && (
          <Icon
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400"
            strokeWidth={1.9}
          />
        )}
        <input
          id={`field-${id}`}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => onTouched(id)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          min={min}
          step={step}
          className={`${baseControlClass} ${borderClass(error, true)} ${Icon ? 'pl-9' : 'pl-3.5'} pr-3.5`}
        />
      </div>
    </FieldShell>
  );
}

interface TextAreaFieldProps {
  id: keyof RfqFormState;
  label: string;
  required?: boolean;
  icon?: typeof User;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onTouched: (field: keyof RfqFormState) => void;
  placeholder?: string;
  className?: string;
}

function TextAreaField({
  id,
  label,
  required,
  icon: Icon,
  value,
  error,
  onChange,
  onTouched,
  placeholder,
  className,
}: TextAreaFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} className={className}>
      <div className="relative">
        {Icon && (
          <Icon
            className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-charcoal-400"
            strokeWidth={1.9}
          />
        )}
        <textarea
          id={`field-${id}`}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => onTouched(id)}
          placeholder={placeholder}
          rows={4}
          className={`${baseControlClass} ${borderClass(error, true)} ${Icon ? 'pl-9' : 'pl-3.5'} pr-3.5 resize-y`}
        />
      </div>
    </FieldShell>
  );
}

interface SelectFieldProps {
  id: keyof RfqFormState;
  label: string;
  required?: boolean;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onTouched: (field: keyof RfqFormState) => void;
  options?: string[];
  placeholder?: string;
  groupedOptions?: { category: string; items: { slug: string; name: string }[] }[];
  className?: string;
}

function SelectField({
  id,
  label,
  required,
  value,
  error,
  onChange,
  onTouched,
  options,
  placeholder,
  groupedOptions,
  className,
}: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} className={className}>
      <select
        id={`field-${id}`}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => onTouched(id)}
        className={`${baseControlClass} ${borderClass(error, true)} pl-3.5 pr-9 appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%237d7c74' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
        }}
      >
        <option value="">{placeholder ?? 'Select an option'}</option>
        {groupedOptions
          ? groupedOptions.map((group) => (
              <optgroup key={group.category} label={group.category}>
                {group.items.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </optgroup>
            ))
          : (options ?? []).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
      </select>
    </FieldShell>
  );
}

function SuccessState({
  onReset,
  product,
  confirmationEmailSent,
  buyerEmail,
}: {
  onReset: () => void;
  product: string | null;
  confirmationEmailSent: boolean;
  buyerEmail: string;
}) {
  return (
    <section className="bg-charcoal-50">
      <div className="container-page py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-card animate-fade-up">
            <CircleCheck className="h-8 w-8" strokeWidth={1.8} />
          </span>
          <h1 className="mt-6 text-3xl font-extrabold text-charcoal-900 sm:text-4xl animate-fade-up" style={{ animationDelay: '0.08s' }}>
            Thank you for your enquiry.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-charcoal-600 animate-fade-up" style={{ animationDelay: '0.16s' }}>
            Your enquiry has been recorded. Our team will review your requirements
            and respond regarding availability, specifications and commercial terms.
          </p>

          {confirmationEmailSent && buyerEmail && (
            <p className="mt-3 text-sm text-charcoal-500 animate-fade-up" style={{ animationDelay: '0.18s' }}>
              A confirmation email has been sent to {buyerEmail}.
            </p>
          )}

          {product && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-charcoal-100 bg-white px-4 py-2.5 text-sm text-charcoal-700 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Package className="h-4 w-4 text-brand-600" />
              Product enquiry: <span className="font-semibold text-charcoal-900">{product}</span>
            </div>
          )}

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-up" style={{ animationDelay: '0.24s' }}>
            <button type="button" onClick={onReset} className="btn-primary text-base">
              <FileText className="h-4 w-4" />
              Submit Another Enquiry
            </button>
            <Link to="/products" className="btn-secondary text-base">
              Browse Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 rounded-2xl border border-charcoal-100 bg-white p-6 text-left animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <p className="text-sm font-semibold text-charcoal-800">What happens next?</p>
            <ul className="mt-3 space-y-2.5 text-sm text-charcoal-600">
              <li className="flex items-start gap-2.5">
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={2} />
                Our team reviews your product, quantity and destination requirements.
              </li>
              <li className="flex items-start gap-2.5">
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={2} />
                We confirm specifications, packaging and applicable requirements.
              </li>
              <li className="flex items-start gap-2.5">
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={2} />
                You receive a quotation based on the agreed specifications and terms.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
