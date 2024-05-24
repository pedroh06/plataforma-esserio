/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSidebar } from "@/hooks/useSidebar";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Fragment } from "react";
import { Text } from "../elements/Text";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Navbar() {
  const { toggleSidebar } = useSidebar();
  // const { data: session } = useSession();

  const user = false;

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 shadow-md backdrop-blur-[18px]"
    >
      {({ open }) => (
        <>
          <div className="mx-auto  px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between md:h-20">
              <div className="flex items-center gap-1">
                <button
                  data-collapse-toggle="navbar-hamburger"
                  type="button"
                  className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  aria-controls="navbar-hamburger"
                  aria-expanded="false"
                  onClick={() => toggleSidebar()}
                >
                  <svg
                    className="h-6 w-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <div className="flex-shrink-0">
                  {/* <Image
                    className="h-8 w-8"
                    src="/static/logos/gaia.svg"
                    alt="Logo da plataforma"
                    width={120}
                    height={120}
                  /> */}
                </div>
              </div>
              <div className="block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm ring-2 ring-green-400 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Abrir menu de usuário</span>
                        {/* <Image
                          className="h-8 w-8 rounded-full"
                          src={user?.image ?? "/static/images/empty-avatar.jpg"}
                          alt="Avatar do usuário"
                          width={32}
                          height={32}
                        /> */}
                        <Image
                          className="h-8 w-8 rounded-full"
                          src={"/static/images/empty-avatar.jpg"}
                          alt="Avatar do usuário"
                          width={32}
                          height={32}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-fit origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-2 py-2">
                          <Menu.Item>
                            <div className="flex flex-col">
                              <Text className="text-white">
                                {/* {user?.name} */}
                              </Text>
                              <Text className="text-white">
                                {/* {user?.email} */}
                              </Text>
                            </div>
                          </Menu.Item>
                          <div className="my-2 h-[1px] bg-white" />
                          {/* <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/profile"
                                className={classNames(
                                  active ? "bg-gray-700" : "",
                                  "block px-4 py-2 text-sm text-gray-300"
                                )}
                              >
                                Perfil
                              </Link>
                            )}
                          </Menu.Item> */}
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => signOut()}
                                className={classNames(
                                  active ? "bg-gray-700" : "",
                                  "block w-full px-4 py-2 text-left text-sm text-gray-300",
                                )}
                              >
                                Sair
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
