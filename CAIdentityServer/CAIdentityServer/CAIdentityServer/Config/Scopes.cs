﻿/*
 * Copyright 2014 Dominick Baier, Brock Allen
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

using IdentityServer3.Core;
using IdentityServer3.Core.Models;
using System.Collections.Generic;

namespace CAIdentityServer.Config
{
    public class Scopes
    {
        public static IEnumerable<Scope> Get()
        {
            return new[]
                {
                    ////////////////////////
                    // identity scopes
                    ////////////////////////

                    StandardScopes.OpenId,
                    StandardScopes.Profile,
                    StandardScopes.Email,
                    StandardScopes.Address,
                    StandardScopes.OfflineAccess,
                    StandardScopes.RolesAlwaysInclude,
                    StandardScopes.AllClaims,

                    new Scope
                    {
                        Enabled = true,
                        Name = "roles",
                        Type = ScopeType.Identity,
                        Claims = new List<ScopeClaim>
                        {
                            new ScopeClaim("role")
                        }
                    },

                    new Scope
                    {
                        Name = "SampleWebAPI",
                        DisplayName = "Sample Web API",
                        Type = ScopeType.Resource,
                        Emphasize = true,

                        ScopeSecrets = new List<Secret>
                        {
                            new Secret("secret".Sha256())
                        },

                        Claims = new List<ScopeClaim>
                        {
                            new ScopeClaim(Constants.ClaimTypes.Name),
                            new ScopeClaim(Constants.ClaimTypes.Role)
                        }
                    },
                    new Scope
                    {
                        Name = "idmgr",
                        DisplayName = "IdentityManager",
                        Type = ScopeType.Resource,
                        Emphasize = true,
                        ShowInDiscoveryDocument = false,

                        Claims = new List<ScopeClaim>
                        {
                            new ScopeClaim(Constants.ClaimTypes.Name),
                            new ScopeClaim(Constants.ClaimTypes.Role)
                        }
                    }
                };
        }
    }
}