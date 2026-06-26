# @countryclub/ui

Librería de componentes compartidos del Country Club. Construida con shadcn/ui, Radix UI y Tailwind CSS v4.

## Instalación

```bash
pnpm add @countryclub/ui
```

> El paquete se publica en GitHub Packages bajo el scope `@countryclub`. Configura el registro en el `.npmrc` de tu proyecto:
> ```
> @countryclub:registry=https://npm.pkg.github.com
> //npm.pkg.github.com/:_authToken=TU_GITHUB_TOKEN
> ```

## Configuración del proyecto consumidor

### 1. `next.config.ts`

```ts
const nextConfig = {
  transpilePackages: ["@countryclub/ui"],
}
export default nextConfig
```

### 2. `app/globals.css`

Los `@import` deben ir primero, en este orden:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@countryclub/ui/tokens.css";

@source "node_modules/@countryclub/ui/src";
@custom-variant dark (&:is(.dark *));
```

`tokens.css` incluye los tokens de color y tipografía del club, el `@theme inline` completo de Tailwind v4, los estilos base de shadcn/ui y los custom variants de shadcn. **No es necesario importar `shadcn/tailwind.css` por separado.**

### 3. Peer dependencies

`@countryclub/ui` requiere que el proyecto consumidor instale:

```bash
pnpm add cmdk sonner lucide-react radix-ui tailwindcss
```

Con pnpm en modo estricto también deben estar en `package.json`:

```json
"dependencies": {
  "cmdk": "^1.1.1",
  "sonner": "^2.0.7",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "radix-ui": "^1.4.3",
  "tailwind-merge": "^3.6.0",
  "tw-animate-css": "^1.4.0"
}
```

---

## Componentes

### Sidebar

Barra lateral vertical colapsable (iconos ↔ texto). En mobile usa un drawer.

```tsx
import { Sidebar } from '@countryclub/ui'
import { Home, Users } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/',           label: 'Inicio',     icon: Home },
  { href: '/directorio', label: 'Directorio', icon: Users },
]

export default function Layout({ children }) {
  return (
    <Sidebar
      logo={<img src="/logo.png" width={28} height={28} />}
      navItems={NAV_ITEMS}
      user={{ name: 'Juan', email: 'juan@club.com', avatarInitials: 'JD' }}
      onLogout={() => signOut()}
      defaultOpen={false}
    >
      {children}
    </Sidebar>
  )
}
```

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `logo` | `ReactNode` | — | Elemento logo en el header |
| `navItems` | `NavItem[]` | — | Lista de rutas |
| `user` | `SidebarUser` | — | Nombre, email e iniciales del usuario |
| `onLogout` | `() => void` | — | Callback al pulsar "Cerrar sesión" |
| `defaultOpen` | `boolean` | `false` | Estado inicial del sidebar |
| `children` | `ReactNode` | — | Contenido principal (va en el `SidebarInset`) |

### Modal + useModal

Diálogo accesible con animación, backdrop, cierre por Escape y scroll interno.

```tsx
import { Modal, useModal } from '@countryclub/ui'

const modal = useModal()

<button onClick={modal.open}>Abrir</button>

<Modal
  isOpen={modal.isOpen}
  onClose={modal.close}
  title="Confirmar acción"
  description="Esta acción no se puede deshacer."
  size="md"
  footer={
    <div className="flex gap-2 justify-end w-full">
      <button onClick={modal.close}>Cancelar</button>
      <button onClick={modal.close}>Confirmar</button>
    </div>
  }
>
  <p>Contenido del modal.</p>
</Modal>
```

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `isOpen` | `boolean` | — | Controla visibilidad |
| `onClose` | `() => void` | — | Callback al cerrar |
| `title` | `string` | — | Título (color primario) |
| `description` | `string` | — | Subtítulo en gris |
| `children` | `ReactNode` | — | Cuerpo (scroll si supera 60vh) |
| `footer` | `ReactNode` | — | Pie con borde superior |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Ancho máximo |
| `showCloseButton` | `boolean` | `true` | Muestra/oculta el botón X |

### LoginPage

Formulario de login desacoplado de cualquier proveedor de autenticación.

```tsx
import { LoginPage } from '@countryclub/ui'

<LoginPage
  logo={<img src="/logo-verde.png" width={72} height={72} />}
  title="Directorio de Socios"
  subtitle="Inicia sesión para continuar"
  onLogin={async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error('Correo o contraseña incorrectos')
    window.location.href = '/'
  }}
/>
```

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `logo` | `ReactNode` | — | Logo centrado arriba del formulario |
| `title` | `string` | `'Iniciar sesión'` | Título de la card |
| `subtitle` | `string` | — | Subtítulo |
| `onLogin` | `(email, password) => Promise<void>` | — | Lanza `Error` para mostrar mensaje de error |

### Toaster

Wrapper de [sonner](https://sonner.emilkowal.ski/) con los estilos del club. Agregar una vez en el layout raíz.

```tsx
import { Toaster } from '@countryclub/ui'
import { toast } from '@countryclub/ui'

// En layout.tsx
<Toaster richColors position="bottom-right" />

// En cualquier componente cliente
toast.success('Guardado correctamente')
toast.error('Ocurrió un error')
toast.warning('Verifica los datos')
toast('Mensaje neutro')
```

`position` acepta: `"top-left"`, `"top-center"`, `"top-right"`, `"bottom-left"`, `"bottom-center"`, `"bottom-right"`. Todos los props de sonner se propagan directamente.

### Combobox

Select con búsqueda integrada. Implementado con el patrón shadcn `Popover` + `Command` (cmdk).

```tsx
import { Combobox } from '@countryclub/ui'

const OPCIONES = [
  { value: 'opt-1', label: 'Opción uno' },
  { value: 'opt-2', label: 'Opción dos' },
]

const [valor, setValor] = useState<string | null>(null)

<Combobox
  options={OPCIONES}
  value={valor}
  onChange={setValor}
  placeholder="Seleccionar..."
  searchPlaceholder="Buscar..."
  emptyLabel="— Sin selección —"
/>
```

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `options` | `ComboboxOption[]` | — | `{ value: string; label: string }[]` |
| `value` | `string \| null` | — | Valor seleccionado (controlado) |
| `onChange` | `(value: string \| null) => void` | — | Callback al seleccionar; recibe `null` al limpiar |
| `placeholder` | `string` | `'Seleccionar...'` | Texto cuando no hay selección |
| `searchPlaceholder` | `string` | `'Buscar...'` | Placeholder del input de búsqueda |
| `emptyLabel` | `string` | — | Si se provee, muestra una opción de limpieza al tope |
| `emptyMessage` | `string` | `'Sin resultados.'` | Texto cuando la búsqueda no arroja resultados |
| `disabled` | `boolean` | — | Deshabilita el control |
| `className` | `string` | — | Clases adicionales para el botón trigger |

---

## Primitivos shadcn/ui exportados

Para uso avanzado también se exportan todos los primitivos directamente:

`Button`, `Badge`, `Card`, `Input`, `Separator`, `Skeleton`, `Alert`, `Table` (y sub-componentes), `Dialog` (y sub-componentes), `Sheet` (y sub-componentes), `Tooltip` / `TooltipProvider`, `DropdownMenu` (y sub-componentes), `Popover` / `PopoverTrigger` / `PopoverContent` / `PopoverAnchor`, `Command` / `CommandInput` / `CommandList` / `CommandItem` / `CommandGroup` / `CommandEmpty` / `CommandSeparator` / `CommandDialog` / `CommandShortcut`, y todos los primitivos del Sidebar shadcn (`SidebarProvider`, `SidebarContent`, `SidebarMenuButton`, etc.).

---

## Desarrollo local

```bash
npm run build   # compila TypeScript a dist/
```

Para enlazar como dependencia local en otro proyecto:

```json
"@countryclub/ui": "file:../ui-library"
```

Después de cada `npm run build`, copiar el `dist/` al caché de pnpm en el proyecto consumidor:

```powershell
$src = "C:\ruta\ui-library\dist"
$dst = (Get-Item ".\node_modules\@countryclub\ui").Target
Copy-Item "$src\*" "$dst\dist\" -Recurse -Force
```

Luego ejecutar **TypeScript: Restart TS server** en VSCode (`Ctrl+Shift+P`) para limpiar la caché de tipos.
