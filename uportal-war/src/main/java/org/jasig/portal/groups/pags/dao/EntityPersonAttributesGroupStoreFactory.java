/**
 * Licensed to Apereo under one or more contributor license
 * agreements. See the NOTICE file distributed with this work
 * for additional information regarding copyright ownership.
 * Apereo licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License.  You may obtain a
 * copy of the License at the following location:
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package org.jasig.portal.groups.pags.dao;

import org.jasig.portal.groups.ComponentGroupServiceDescriptor;
import org.jasig.portal.groups.GroupsException;
import org.jasig.portal.groups.IEntityGroupStore;
import org.jasig.portal.groups.IEntityGroupStoreFactory;

/**
 * Factory class for Person Attributes Group Store
 * @author Shawn Connolly, sconnolly@unicon.net
 * @since 4.1
 */
public class EntityPersonAttributesGroupStoreFactory implements IEntityGroupStoreFactory {
   private static IEntityGroupStore groupStore = new EntityPersonAttributesGroupStore();
   
   public static IEntityGroupStore getGroupStore() {
      return groupStore;
   }
   
   public IEntityGroupStore newGroupStore() throws GroupsException {
      return getGroupStore();
   }

   public IEntityGroupStore newGroupStore(ComponentGroupServiceDescriptor svcDescriptor) throws GroupsException {
      return getGroupStore();   
   }

}
