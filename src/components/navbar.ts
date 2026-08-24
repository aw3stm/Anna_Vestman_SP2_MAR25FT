export function renderNavbar(): string {
  return ` 
    <header class="bg-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
    <button type="button"
    aria-label="Open menu"
    class="text-3xl">
    ☰
    </button>
    <a href="/"> <img src="/src/assets/Bidora logo with circle.svg" alt="main logo with Bidora text" /></a>

    <div class="flex items-center gap-4">
    <span class="hidden sm:block">2,342 credits</span>
    <a href="/profile" aria-label="Profile">
    <img src="/src/assets/Avatar.svg" alt="Profile" class="h-10 w-10" /></a></div>
    </nav></header>
    
    `;
}
