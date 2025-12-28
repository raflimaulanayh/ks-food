import { CaretDown, Check } from '@phosphor-icons/react'
import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}
export const InputGroup = ({ label, className = '', ...props }: InputProps) => (
  <div className={`space-y-2 ${className}`}>
    <label className="block text-sm font-bold text-slate-800">{label}</label>
    <input
      {...props}
      className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-700 transition-all placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
    />
  </div>
)

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}
export const TextareaGroup = ({ label, className = '', ...props }: TextareaProps) => (
  <div className={`space-y-2 ${className}`}>
    <label className="block text-sm font-bold text-slate-800">{label}</label>
    <textarea
      {...props}
      className="min-h-[120px] w-full resize-none rounded-md border border-slate-300 px-4 py-3 text-slate-700 transition-all placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
    />
  </div>
)

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: string[]
  placeholder?: string
}
export const SelectGroup = ({ label, options, placeholder = 'Pilih', ...props }: SelectProps) => (
  <div className="space-y-2">
    <label className="block text-sm font-bold text-slate-800">{label}</label>
    <div className="relative">
      <select
        {...props}
        className="w-full cursor-pointer appearance-none rounded-md border border-slate-300 px-4 py-3 text-slate-700 transition-all focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
        defaultValue=""
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-500">
        <CaretDown size={18} weight="bold" />
      </div>
    </div>
  </div>
)

interface CheckboxProps {
  label: string
  checked: boolean
  onChange: () => void
}
export const CheckboxCustom = ({ label, checked, onChange }: CheckboxProps) => (
  <div onClick={onChange} className="group flex cursor-pointer items-center gap-3 select-none">
    <div
      className={`flex h-6 w-6 items-center justify-center rounded border transition-all ${
        checked ? 'border-primary bg-primary' : 'border-slate-300 bg-white group-hover:border-primary'
      }`}
    >
      {checked && <Check size={14} color="white" weight="bold" />}
    </div>
    <span className="text-slate-700">{label}</span>
  </div>
)
